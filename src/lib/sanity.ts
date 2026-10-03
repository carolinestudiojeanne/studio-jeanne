import {createClient, type SanityClient} from '@sanity/client'

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined
export const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production'
const apiVersion = '2026-10-01'

/** Vrai quand le site est relié à Sanity. Sinon il affiche le contenu d'exemple. */
export const sanityActif = Boolean(projectId)

export const client: SanityClient | null = projectId
  ? createClient({projectId, dataset, apiVersion, useCdn: false, perspective: 'published'})
  : null

/** Client pour l'aperçu des brouillons (page /apercu, côté serveur uniquement). */
export function clientApercu(token: string): SanityClient | null {
  if (!projectId) return null
  return createClient({projectId, dataset, apiVersion, useCdn: false, token, perspective: 'drafts'})
}
