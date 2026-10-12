/**
 * Remplit Sanity en une fois avec le contenu actuel du site :
 * réglages, pages fixes, pages légales et les projets (textes + photos).
 *
 * Les photos des projets sont téléchargées depuis l'ancien site et envoyées dans Sanity,
 * pour ne plus dépendre de l'ancien hébergement. Les images d'exemple (cases de couleur) ne sont pas importées.
 * Les avis d'exemple ne sont pas importés : les vrais avis Google s'ajoutent à part.
 *
 * Les documents qui existent déjà ne sont pas modifiés (relancer le script ne casse rien).
 * Ajouter --remplacer pour écraser les projets déjà importés, --essai pour tout vérifier sans rien envoyer.
 *
 * Usage : npm run importer
 * Clé : SANITY_API_WRITE_TOKEN, ou à défaut la connexion faite avec `npx sanity login`.
 */
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'
import {createClient} from '@sanity/client'
import * as demo from '../src/lib/demo'
import type {ImageData} from '../src/lib/types'
import {COMMUNES} from '../studio/schemaTypes/communes'

function jetonCli(): string | undefined {
  const chemins = [join(homedir(), '.config', 'sanity', 'config.json'), join(homedir(), '.sanity', 'config.json')]
  for (const chemin of chemins) {
    try {
      return JSON.parse(readFileSync(chemin, 'utf8')).authToken
    } catch {
      // essaie le chemin suivant
    }
  }
}

const essai = process.argv.includes('--essai')
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || (essai ? 'essai' : undefined)
const token = process.env.SANITY_API_WRITE_TOKEN || jetonCli() || (essai ? 'essai' : undefined)
if (!projectId || !token) {
  console.error('Il manque PUBLIC_SANITY_PROJECT_ID (fichier .env) ou la connexion Sanity (`npx sanity login`).')
  process.exit(1)
}
const remplacer = process.argv.includes('--remplacer')
const client = createClient({projectId, dataset: process.env.PUBLIC_SANITY_DATASET || 'production', apiVersion: '2026-10-01', token, useCdn: false})

/** Envoie une photo de l'ancien site dans Sanity (une seule fois par adresse). */
const envois = new Map<string, Promise<string>>()
function envoyer(url: string): Promise<string> {
  if (!envois.has(url)) {
    envois.set(
      url,
      (async () => {
        if (essai) return `image-essai-${envois.size}`
        const reponse = await fetch(url)
        if (!reponse.ok) throw new Error(`Photo introuvable (${reponse.status}) : ${url}`)
        const nom = decodeURIComponent(url.split('/').pop() || 'photo.jpg')
        const asset = await client.assets.upload('image', Buffer.from(await reponse.arrayBuffer()), {filename: nom})
        console.log(`  photo envoyée : ${nom}`)
        return asset._id
      })(),
    )
  }
  return envois.get(url)!
}

/** Image du site → image Sanity. Les images d'exemple locales sont retirées. */
async function image(img: ImageData | undefined) {
  if (!img?.src || !/^https?:\/\//.test(img.src)) return undefined
  const ref = await envoyer(img.src)
  return {
    _type: 'imageAlt',
    asset: {_type: 'reference', _ref: ref},
    alt: img.alt,
    ...(img.legende ? {legende: img.legende} : {}),
    ...(img.rendu3D ? {rendu3D: true} : {}),
  }
}

/** Parcourt un contenu : convertit les images, ajoute les _key manquantes. */
async function convertir(v: unknown): Promise<unknown> {
  if (Array.isArray(v)) {
    const liste = await Promise.all(v.map(convertir))
    return liste
      .filter((x) => x !== undefined)
      .map((x, i) => (x && typeof x === 'object' && !('_key' in x) ? {_key: `k${i}`, ...x} : x))
  }
  if (v && typeof v === 'object') {
    if ('src' in v) return image(v as ImageData)
    const entrees = await Promise.all(Object.entries(v).map(async ([k, x]) => [k, await convertir(x)] as const))
    return Object.fromEntries(entrees.filter(([, x]) => x !== undefined))
  }
  return v
}

// 1. Réglages et pages
const {texteA: a1, texteB: b1, ...accompagnement} = demo.pageAccompagnement
const {texteA: a2, texteB: b2, ...trouver} = demo.pageTrouverVotreBien
const pages: Array<Record<string, unknown>> = [
  {_id: 'reglages', _type: 'reglages', ...demo.reglages},
  {_id: 'pageAccueil', _type: 'pageAccueil', ...demo.pageAccueil},
  {_id: 'pageProjets', _type: 'pageProjets', ...demo.pageProjets},
  {_id: 'pageAccompagnement', _type: 'pageAccompagnement', ...accompagnement, horsPerimetre: a1, commandes: b1},
  {_id: 'pageTrouverVotreBien', _type: 'pageTrouverVotreBien', ...trouver, apresAchat: a2, deuxStructures: b2},
  {_id: 'pageAPropos', _type: 'pageAPropos', ...demo.pageAPropos},
  {_id: 'pageContact', _type: 'pageContact', ...demo.pageContact},
  {_id: 'pageAvisClients', _type: 'pageAvisClients', ...demo.pageAvisClients},
  ...Object.entries(demo.pagesLegales).map(([id, p]) => ({_id: id, _type: 'pageLegale', ...p})),
]

console.log('Pages et réglages…')
const txPages = client.transaction()
for (const doc of pages) txPages.createIfNotExists((await convertir(doc)) as {_id: string; _type: string})
if (!essai) await txPages.commit()
console.log(`${pages.length} pages prêtes.`)

// 2. Projets, dans l'ordre du site
console.log('Projets (envoi des photos, quelques minutes)…')
const communes = COMMUNES as readonly string[]
for (const [i, p] of demo.projets.entries()) {
  const {_id, slug, commune, projetsLies, _updatedAt, ...reste} = p
  const doc: Record<string, any> = {
    _id,
    _type: 'projet',
    orderRank: `0|${String(100000 + i * 1000).padStart(6, '0')}:`,
    ...((await convertir(reste)) as Record<string, unknown>),
    slug: {_type: 'slug', current: slug},
    ...(commune && communes.includes(commune) ? {commune} : commune ? {commune: 'autre', communeAutre: commune} : {}),
  }
  // Types des éléments de liste attendus par le Studio
  if (Array.isArray(doc.galerie)) doc.galerie = doc.galerie.map((g: Record<string, unknown>) => ({_type: 'imageGalerie', ...g}))
  if (Array.isArray(doc.avantApres)) doc.avantApres = doc.avantApres.map((g: Record<string, unknown>) => ({_type: 'avantApres', ...g}))
  if (essai) console.log(JSON.stringify(doc).slice(0, 600))
  else if (remplacer) await client.createOrReplace(doc as {_id: string; _type: string})
  else await client.createIfNotExists(doc as {_id: string; _type: string})
  console.log(`✓ ${p.titre}`)
}

console.log('Import terminé. Ouvrez le Studio pour vérifier, puis relancez le site.')
