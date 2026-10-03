/**
 * Point d'accès unique aux contenus du site.
 * Relié à Sanity quand PUBLIC_SANITY_PROJECT_ID est renseigné, sinon contenu d'exemple (demo.ts).
 */
import {client, sanityActif} from './sanity'
import {Q} from './queries'
import * as demo from './demo'
import type {
  Avis,
  PageAccueil,
  PageAPropos,
  PageContact,
  PageLegale,
  PageOffre,
  PageProjets,
  PageSimple,
  Projet,
  ProjetCarte,
  Reglages,
} from './types'

async function lire<T>(requete: string, params: Record<string, unknown>, secours: T): Promise<T> {
  if (!sanityActif || !client) return secours
  const resultat = await client.fetch<T | null>(requete, params)
  return resultat ?? secours
}

// Mise en cache pendant la construction : chaque requête n'est faite qu'une fois.
const cache = new Map<string, Promise<unknown>>()
function memo<T>(cle: string, f: () => Promise<T>): Promise<T> {
  if (!cache.has(cle)) cache.set(cle, f())
  return cache.get(cle) as Promise<T>
}

export const getReglages = () =>
  memo('reglages', async () => ({...demo.reglages, ...(await lire<Partial<Reglages>>(Q.reglages, {}, {}))}) as Reglages)

export const getProjets = () => memo('projets', () => lire<ProjetCarte[]>(Q.projets, {}, demo.projets))
export const getProjetsComplets = () => memo('projetsComplets', () => lire<Projet[]>(Q.projetsComplets, {}, demo.projets))
export const getProjetsAccueil = () =>
  memo('projetsAccueil', () => lire<ProjetCarte[]>(Q.projetsAccueil, {}, demo.projets.filter((p) => p.categorie === 'residentiel').slice(0, 4)))

export const getAvis = () => memo('avis', () => lire<Avis[]>(Q.avis, {}, demo.avis))
export const getAvisAccueil = () => memo('avisAccueil', () => lire<Avis[]>(Q.avisAccueil, {}, demo.avis.slice(0, 3)))

const page = <T>(id: string, secours: T) => memo(`page:${id}`, () => lire<T>(Q.page, {id}, secours))

export const getPageAccueil = () => page<PageAccueil>('pageAccueil', demo.pageAccueil)
export const getPageProjets = () => page<PageProjets>('pageProjets', demo.pageProjets)
export const getPageAccompagnement = () =>
  memo('pageAccompagnement', () => lire<PageOffre>(Q.pageOffreAccompagnement, {}, demo.pageAccompagnement))
export const getPageTrouverVotreBien = () =>
  memo('pageTrouver', () => lire<PageOffre>(Q.pageOffreTrouver, {}, demo.pageTrouverVotreBien))
export const getPageAPropos = () => page<PageAPropos>('pageAPropos', demo.pageAPropos)
export const getPageContact = () => page<PageContact>('pageContact', demo.pageContact)
export const getPageProfessionnels = () => page<PageSimple>('pageProfessionnels', demo.pageProfessionnels)
export const getPageAvisClients = () => page<PageSimple>('pageAvisClients', demo.pageAvisClients)
export const getPageLegale = (id: 'mentions-legales' | 'politique-de-confidentialite' | 'cgv') =>
  page<PageLegale>(id, demo.pagesLegales[id])

/**
 * Projets à montrer en bas d'une page projet : ceux choisis par Caroline,
 * sinon même catégorie, en privilégiant même commune puis même type de bien.
 */
export function projetsLies(projet: Projet, tous: ProjetCarte[]): ProjetCarte[] {
  if (projet.projetsLies?.length) return projet.projetsLies.filter(Boolean).slice(0, 3)
  const autres = tous.filter((p) => p._id !== projet._id && p.categorie === projet.categorie)
  const score = (p: ProjetCarte) => (p.commune === projet.commune ? 2 : 0) + (p.typeDeBien === projet.typeDeBien ? 1 : 0)
  return [...autres].sort((a, b) => score(b) - score(a)).slice(0, 3)
}
