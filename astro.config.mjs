// @ts-check
import {defineConfig} from 'astro/config'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'

/**
 * En local (npm run dev), les pages projet sont calculées à chaque visite : sinon Astro garde
 * en mémoire la liste des projets du démarrage, et un projet ajouté ou renommé dans le Studio
 * tombe sur la page 404 jusqu'au redémarrage (la page 404 aussi, pour pouvoir s'y rabattre).
 * En ligne, rien ne change (pages générées).
 * @returns {import('astro').AstroIntegration}
 */
function projetsAJourEnLocal() {
  let enLocal = false
  return {
    name: 'projets-a-jour-en-local',
    hooks: {
      'astro:config:setup': ({command}) => {
        enLocal = command === 'dev'
      },
      'astro:route:setup': ({route}) => {
        if (enLocal && /projets\/\[slug\]\.astro$|pages\/404\.astro$/.test(route.component)) route.prerender = false
      },
    },
  }
}

export default defineConfig({
  // Adresse canonique unique du site (cahier des charges §11).
  site: 'https://www.studio-jeanne.com',
  output: 'static',
  // Seule la page d'aperçu (/apercu/…) tourne côté serveur, pour afficher les brouillons Sanity.
  // devFeatures désactivées : en local, l'émulation Netlify demande Deno, inutile pour ce site.
  adapter: netlify({devFeatures: false}),
  trailingSlash: 'never',
  build: {format: 'file'},
  integrations: [
    projetsAJourEnLocal(),
    sitemap({
      // La carte de visite (/carte) reste hors du plan du site.
      filter: (page) => !page.includes('/apercu') && !/\/carte\/?$/.test(page),
    }),
  ],
  image: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
})
