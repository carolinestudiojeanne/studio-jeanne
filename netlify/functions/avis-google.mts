/**
 * Avis Google → Sanity, une fois par jour.
 *
 * Va chercher les avis de la fiche Google de Studio Jeanne et ajoute dans Sanity les nouveaux
 * avis 5 étoiles qui ont un texte. Deux sources possibles :
 * - une feuille Google Sheets remplie par Zapier et publiée en CSV (AVIS_SHEET_CSV_URL) ;
 * - l'API Google Business Profile (variables GOOGLE_…), si Google en accorde l'accès.
 * Les avis déjà présents (importés à la main ou lors d'un passage précédent) ne sont pas dupliqués.
 * Si au moins un avis est ajouté, le site est reconstruit (NETLIFY_BUILD_HOOK).
 *
 * Tant qu'aucune des deux sources n'est renseignée dans Netlify, la fonction ne fait rien.
 * Mise en place : voir README, « Avis Google automatiques ».
 */
import {createClient} from '@sanity/client'

export const config = {schedule: '@daily'}

const ENV_SANITY = ['PUBLIC_SANITY_PROJECT_ID', 'SANITY_API_WRITE_TOKEN'] as const
const ENV_GOOGLE = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN', 'GOOGLE_ACCOUNT_ID', 'GOOGLE_LOCATION_ID'] as const

/** Un avis, quelle que soit sa source. */
type Avis = {id: string; nom: string; texte: string; note: number; date: string}

type AvisGoogle = {
  reviewId: string
  reviewer?: {displayName?: string}
  starRating?: string
  comment?: string
  createTime?: string
}

/** Texte comparable : sans ponctuation, espaces ni accents, en minuscules. */
const empreinte = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
    .slice(0, 120)

/** Google ajoute parfois une traduction : on garde le texte original. */
function texteOriginal(comment: string): string {
  const original = comment.match(/\(Original\)\s*([\s\S]*)$/)
  if (original) return original[1].trim()
  return comment.replace(/\s*\(Translated by Google\)[\s\S]*$/, '').trim()
}

/** Lecture d'un CSV (champs entre guillemets, virgules et retours à la ligne dans le texte). */
function lireCsv(csv: string): string[][] {
  const lignes: string[][] = []
  let ligne: string[] = []
  let champ = ''
  let guillemets = false
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (guillemets) {
      if (c === '"' && csv[i + 1] === '"') (champ += '"'), i++
      else if (c === '"') guillemets = false
      else champ += c
    } else if (c === '"') guillemets = true
    else if (c === ',') ligne.push(champ), (champ = '')
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && csv[i + 1] === '\n') i++
      ligne.push(champ), lignes.push(ligne), (ligne = []), (champ = '')
    } else champ += c
  }
  if (champ || ligne.length) ligne.push(champ), lignes.push(ligne)
  return lignes.filter((l) => l.some((v) => v.trim()))
}

/** « 5 », « FIVE », « 5 étoiles », « ★★★★★ » → 5. */
function lireNote(valeur: string): number {
  const v = valeur.trim().toUpperCase()
  const mots: Record<string, number> = {ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5}
  if (mots[v]) return mots[v]
  const etoiles = (v.match(/★/g) || []).length
  if (etoiles) return etoiles
  return parseInt(v, 10) || 0
}

/** « 2026-10-20T… » ou « 20/10/2026 » → « 2026-10-20 ». */
function lireDate(valeur: string): string {
  const v = valeur.trim()
  const fr = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (fr) return `${fr[3]}-${fr[2].padStart(2, '0')}-${fr[1].padStart(2, '0')}`
  const iso = v.match(/^\d{4}-\d{2}-\d{2}/)
  if (iso) return iso[0]
  const d = new Date(v)
  return (isNaN(d.getTime()) ? new Date() : d).toISOString().slice(0, 10)
}

/** Feuille Google Sheets remplie par Zapier, colonnes ID, Date, Prénom, Note, Texte (dans n'importe quel ordre). */
async function avisFeuille(url: string): Promise<Avis[]> {
  const reponse = await fetch(url)
  if (!reponse.ok) throw new Error(`Lecture de la feuille des avis refusée (${reponse.status})`)
  const [entete, ...lignes] = lireCsv(await reponse.text())
  const cle = (t: string) => t.normalize('NFD').replace(/[^a-zA-Z]/g, '').toLowerCase()
  const col = Object.fromEntries((entete || []).map((t, i) => [cle(t), i]))
  const manquantes = ['id', 'date', 'prenom', 'note', 'texte'].filter((c) => col[c] === undefined)
  if (manquantes.length) throw new Error(`Feuille des avis : colonne(s) introuvable(s) : ${manquantes.join(', ')}`)
  return lignes
    .map((l) => ({
      id: (l[col.id] || '').trim(),
      nom: l[col.prenom] || '',
      texte: l[col.texte] || '',
      note: lireNote(l[col.note] || ''),
      date: lireDate(l[col.date] || ''),
    }))
    .filter((a) => a.id)
}

async function jetonGoogle(env: Record<string, string>): Promise<string> {
  const reponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  if (!reponse.ok) throw new Error(`Connexion Google refusée (${reponse.status}) : ${await reponse.text()}`)
  return (await reponse.json()).access_token
}

async function avisGoogle(env: Record<string, string>): Promise<Avis[]> {
  const jeton = await jetonGoogle(env)
  const base = `https://mybusiness.googleapis.com/v4/accounts/${env.GOOGLE_ACCOUNT_ID}/locations/${env.GOOGLE_LOCATION_ID}/reviews`
  const tous: AvisGoogle[] = []
  let page: string | undefined
  do {
    const url = `${base}?pageSize=50&orderBy=updateTime%20desc${page ? `&pageToken=${page}` : ''}`
    const reponse = await fetch(url, {headers: {Authorization: `Bearer ${jeton}`}})
    if (!reponse.ok) throw new Error(`Lecture des avis refusée (${reponse.status}) : ${await reponse.text()}`)
    const donnees = await reponse.json()
    tous.push(...(donnees.reviews || []))
    page = donnees.nextPageToken
  } while (page)
  return tous.map((a) => ({
    id: a.reviewId,
    nom: a.reviewer?.displayName || '',
    texte: a.comment || '',
    note: a.starRating === 'FIVE' ? 5 : 0,
    date: (a.createTime || new Date().toISOString()).slice(0, 10),
  }))
}

export default async () => {
  const env = Object.fromEntries([...ENV_SANITY, ...ENV_GOOGLE].map((k) => [k, process.env[k] || ''])) as Record<string, string>
  const feuille = process.env.AVIS_SHEET_CSV_URL || ''
  const google = ENV_GOOGLE.every((k) => env[k])
  const manquantes = ENV_SANITY.filter((k) => !env[k])
  if (manquantes.length || (!feuille && !google)) {
    const quoi = [...manquantes, ...(!feuille && !google ? ['AVIS_SHEET_CSV_URL (ou les variables GOOGLE_…)'] : [])]
    console.log(`Avis Google : pas encore activé (il manque ${quoi.join(', ')}).`)
    return new Response('inactif')
  }

  const sanity = createClient({
    projectId: env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-10-01',
    token: env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  })

  const existants = await sanity.fetch<{_id: string; texte?: string}[]>(`*[_type == "avis"]{_id, texte}`)
  const ids = new Set(existants.map((a) => a._id.replace(/^drafts\./, '')))
  const textes = new Set(existants.map((a) => empreinte(a.texte || '')).filter(Boolean))

  const recus = [...(feuille ? await avisFeuille(feuille) : []), ...(google ? await avisGoogle(env) : [])]
  const nouveaux = recus
    .filter((a) => a.note === 5 && a.texte.trim())
    .map((a) => ({
      _id: `avis-google-${a.id.replace(/[^a-zA-Z0-9_-]/g, '')}`,
      _type: 'avis',
      prenom: (a.nom || 'Client').trim().split(/\s+/)[0],
      texte: texteOriginal(a.texte),
      note: 5,
      date: a.date,
      source: 'Google',
      miseEnAvantAccueil: false,
    }))
    .filter((a) => {
      // Ni déjà dans Sanity, ni en double dans ce passage (même ligne deux fois, ou les deux sources).
      const e = empreinte(a.texte)
      if (ids.has(a._id) || textes.has(e)) return false
      ids.add(a._id)
      textes.add(e)
      return true
    })

  if (!nouveaux.length) {
    console.log('Avis Google : rien de nouveau.')
    return new Response('rien de nouveau')
  }

  const tx = sanity.transaction()
  for (const a of nouveaux) tx.createIfNotExists(a)
  await tx.commit()
  console.log(`Avis Google : ${nouveaux.length} avis ajouté(s) : ${nouveaux.map((a) => a.prenom).join(', ')}.`)

  if (process.env.NETLIFY_BUILD_HOOK) await fetch(process.env.NETLIFY_BUILD_HOOK, {method: 'POST'})
  return new Response(`${nouveaux.length} avis ajouté(s)`)
}
