/**
 * Avis Google → Sanity, une fois par jour.
 *
 * Va chercher les avis de la fiche Google de Studio Jeanne (Google Business Profile)
 * et ajoute dans Sanity les nouveaux avis 5 étoiles qui ont un texte.
 * Les avis déjà présents (importés à la main ou lors d'un passage précédent) ne sont pas dupliqués.
 * Si au moins un avis est ajouté, le site est reconstruit (NETLIFY_BUILD_HOOK).
 *
 * Tant que les variables Google ne sont pas renseignées dans Netlify, la fonction ne fait rien.
 * Mise en place : voir README, « Avis Google automatiques ».
 */
import {createClient} from '@sanity/client'

export const config = {schedule: '@daily'}

const ENV = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
  'GOOGLE_ACCOUNT_ID',
  'GOOGLE_LOCATION_ID',
  'PUBLIC_SANITY_PROJECT_ID',
  'SANITY_API_WRITE_TOKEN',
] as const

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

async function avisGoogle(env: Record<string, string>): Promise<AvisGoogle[]> {
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
  return tous
}

export default async () => {
  const env = Object.fromEntries(ENV.map((k) => [k, process.env[k] || ''])) as Record<string, string>
  const manquantes = ENV.filter((k) => !env[k])
  if (manquantes.length) {
    console.log(`Avis Google : pas encore activé (il manque ${manquantes.join(', ')}).`)
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

  const nouveaux = (await avisGoogle(env))
    .filter((a) => a.starRating === 'FIVE' && a.comment?.trim())
    .map((a) => {
      const texte = texteOriginal(a.comment!)
      return {
        _id: `avis-google-${a.reviewId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
        _type: 'avis',
        prenom: (a.reviewer?.displayName || 'Client').trim().split(/\s+/)[0],
        texte,
        note: 5,
        date: (a.createTime || new Date().toISOString()).slice(0, 10),
        source: 'Google',
        miseEnAvantAccueil: false,
      }
    })
    .filter((a) => !ids.has(a._id) && !textes.has(empreinte(a.texte)))

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
