/**
 * Carte de visite de Caroline (/carte) et sa fiche contact (/caroline-canova.vcf).
 * Contenu dans Sanity (document « Carte de visite ») ; chaque champ vide reprend le contenu d'origine (carte-origine.ts).
 */
import {createImageUrlBuilder} from '@sanity/image-url'
import {client, dataset, projectId, sanityActif} from './sanity'
import type {ImageData} from './types'
import {CARTE_ORIGINE, type Carte} from './carte-origine'

export type {Carte}

/** Champ vide dans Sanity (absent, texte blanc, liste vide, image sans fichier) : on garde l'origine. */
function vide(v: unknown): boolean {
  if (v == null) return true
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  if (typeof v === 'object' && '_type' in v && (v as {_type: string})._type === 'image') return !(v as ImageData).asset
  return false
}

let enCours: Promise<Carte> | undefined
export function getCarte(): Promise<Carte> {
  if (!enCours || import.meta.env.DEV) {
    enCours = (async () => {
      const sanity = sanityActif && client ? await client.fetch<Partial<Carte> | null>(`*[_id == "carteVisite"][0]`) : null
      const carte = {...CARTE_ORIGINE}
      for (const cle of Object.keys(carte) as Array<keyof Carte>) {
        const v = sanity?.[cle]
        if (!vide(v)) (carte as Record<string, unknown>)[cle] = v
      }
      // Photos ajoutées sans fichier : ignorées.
      carte.photos = carte.photos.filter((p) => p.image?.asset || p.image?.src)
      if (!carte.photos.length) carte.photos = CARTE_ORIGINE.photos
      return carte
    })()
  }
  return enCours
}

const builder = projectId ? createImageUrlBuilder({projectId, dataset}) : null

/**
 * Adresses d'une image affichée à `largeur` px (CSS), recadrée au ratio voulu autour du point focal.
 * Images d'origine : le fichier tel quel.
 */
export function image(img: ImageData, largeur: number, ratio?: number): {src: string; srcset?: string} {
  if (!img.asset || !builder) return {src: img.src || ''}
  const url = (d: number) => {
    let b = builder.image(img).width(largeur * d).auto('format').quality(80)
    if (ratio) b = b.height(Math.round((largeur * d) / ratio)).fit('crop')
    return b.url()
  }
  return {src: url(2), srcset: `${url(1)} 1x, ${url(2)} 2x, ${url(3)} 3x`}
}

/** Image de l'aperçu du lien : JPEG 1200 × 630 (WhatsApp ne lit ni le WebP ni les images trop lourdes). */
export function imagePartage(img: ImageData): {url: string; type: string} {
  if (!img.asset || !builder) return {url: img.src || '', type: 'image/png'}
  return {url: builder.image(img).width(1200).height(630).fit('crop').format('jpg').quality(80).url(), type: 'image/jpeg'}
}

const chiffres = (tel: string) => tel.replace(/[^\d+]/g, '')

/** 06 62 87 09 96 → +33662870996 (lien tel:). */
export function telInternational(tel: string): string {
  const c = chiffres(tel)
  return c.startsWith('+') ? c : c.startsWith('0') ? `+33${c.slice(1)}` : c
}

/** 06 62 87 09 96 → +33 6 62 87 09 96 (fiche contact). */
function telFiche(tel: string): string {
  const c = telInternational(tel)
  const m = c.match(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/)
  return m ? `+33 ${m.slice(1).join(' ')}` : c
}

/** Retours à la ligne au format vCard. Les virgules restent telles quelles (lues correctement par iPhone et Android). */
const t = (s: string) => s.trim().replace(/\r?\n/g, '\\n')
/** Champs composés (N, ORG) : le point-virgule sépare les parties, on l'échappe. */
const v = (s: string) => t(s).replace(/;/g, '\\;')

/** Fiche contact vCard 3.0 (lignes terminées par CRLF). */
export function vcard(c: Carte): string {
  const lignes = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${v(c.nom)};${v(c.prenom)};;;`,
    `FN:${t(`${c.prenom} ${c.nom}`)}`,
    `ORG:${v(c.ficheOrganisation)}`,
    `TITLE:${t(c.ficheFonction)}`,
    `TEL;TYPE=CELL,VOICE:${telFiche(c.telephone)}`,
    ...c.emails.map((e, i) => `EMAIL;TYPE=INTERNET${i === 0 ? ',WORK,PREF' : ''}:${e.trim()}`),
    ...c.ficheLiens.flatMap((l, i) => [`item${i + 1}.URL:${l.url}`, `item${i + 1}.X-ABLabel:${t(l.libelle)}`]),
    `NOTE:${t(c.ficheNote)}`,
    'END:VCARD',
  ]
  return lignes.join('\r\n') + '\r\n'
}
