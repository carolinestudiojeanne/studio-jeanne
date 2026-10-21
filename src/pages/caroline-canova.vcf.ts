import type {APIRoute} from 'astro'
import {getCarte, vcard} from '../lib/carte'

/** Fiche contact de la carte de visite (bouton « Ajouter le contact »), générée depuis Sanity. */
export const GET: APIRoute = async () =>
  new Response(vcard(await getCarte()), {headers: {'Content-Type': 'text/vcard; charset=utf-8'}})
