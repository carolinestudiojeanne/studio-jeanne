/**
 * Remplit le document « Carte de visite » de Sanity avec le contenu actuel de /carte
 * (textes, coordonnées, liens, fiche contact) et ses images (public/carte-images, public/carte-apercu.png).
 *
 * Si le document existe déjà, il n'est pas modifié. Ajouter --remplacer pour l'écraser,
 * --essai pour afficher le document sans rien envoyer.
 *
 * Usage : npm run importer-carte
 * Clé : SANITY_API_WRITE_TOKEN, ou à défaut la connexion faite avec `npx sanity login`.
 */
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {basename, join} from 'node:path'
import {createClient} from '@sanity/client'
import {CARTE_ORIGINE} from '../src/lib/carte-origine'
import type {ImageData} from '../src/lib/types'

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
const remplacer = process.argv.includes('--remplacer')
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || (essai ? 'essai' : undefined)
const token = process.env.SANITY_API_WRITE_TOKEN || jetonCli() || (essai ? 'essai' : undefined)
if (!projectId || !token) {
  console.error('Il manque PUBLIC_SANITY_PROJECT_ID (fichier .env) ou la connexion Sanity (`npx sanity login`).')
  process.exit(1)
}
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'
const client = createClient({projectId, dataset, apiVersion: '2026-10-01', token, useCdn: false})

/** Envoie une image du dossier public dans Sanity et renvoie le champ image correspondant. */
async function image(img: ImageData) {
  const chemin = join('public', new URL(img.src || '', 'https://www.studio-jeanne.com').pathname)
  const fichier = readFileSync(chemin)
  const _ref = essai ? `image-essai-${basename(chemin)}` : (await client.assets.upload('image', fichier, {filename: basename(chemin)}))._id
  if (!essai) console.log(`  image envoyée : ${basename(chemin)}`)
  return {_type: 'image', asset: {_type: 'reference', _ref}, alt: img.alt}
}

const existant = essai ? null : await client.getDocument('carteVisite')
if (existant && !remplacer) {
  console.log('La carte de visite existe déjà dans Sanity : rien n’a été modifié (ajouter --remplacer pour l’écraser).')
  process.exit(0)
}

const c = CARTE_ORIGINE
const doc = {
  _id: 'carteVisite',
  _type: 'carteVisite',
  prenom: c.prenom,
  nom: c.nom,
  portrait: await image(c.portrait),
  metiers: c.metiers.map((m, i) => ({_key: `metier${i}`, _type: 'metier', ...m})),
  boutonAjouter: c.boutonAjouter,
  intro: c.intro,
  titreContact: c.titreContact,
  telephone: c.telephone,
  emails: c.emails,
  titreTravail: c.titreTravail,
  sousTitreTravail: c.sousTitreTravail,
  photos: await Promise.all(c.photos.map(async (p, i) => ({_key: `photo${i}`, _type: 'photo', image: await image(p.image), lieu: p.lieu}))),
  boutons: c.boutons.map((b, i) => ({_key: `bouton${i}`, _type: 'bouton', ...b})),
  logoClair: await image(c.logoClair),
  logoSombre: await image(c.logoSombre),
  mentionBas: c.mentionBas,
  ficheOrganisation: c.ficheOrganisation,
  ficheFonction: c.ficheFonction,
  ficheNote: c.ficheNote,
  ficheLiens: c.ficheLiens.map((l, i) => ({_key: `site${i}`, _type: 'site', ...l})),
  titreOnglet: c.titreOnglet,
  description: c.description,
  imagePartage: await image(c.imagePartage),
}

if (essai) {
  console.log(JSON.stringify(doc, null, 2))
  console.log(`\nEssai : rien n’a été envoyé (projet ${projectId}, jeu de données ${dataset}).`)
} else {
  await client.createOrReplace(doc)
  console.log(`Carte de visite ${existant ? 'remplacée' : 'créée'} dans Sanity (jeu de données ${dataset}).`)
}
