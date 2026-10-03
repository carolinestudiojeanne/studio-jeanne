import type {APIRoute} from 'astro'

/**
 * robots.txt : tout est autorisé sauf l'aperçu des brouillons.
 * Sur l'adresse provisoire, c'est la balise noindex (PUBLIC_NOINDEX=true) qui empêche l'indexation.
 */
export const GET: APIRoute = ({site}) =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /apercu/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  })
