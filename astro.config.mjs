// @ts-check
import {defineConfig} from 'astro/config'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'

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
    sitemap({
      filter: (page) => !page.includes('/apercu'),
    }),
  ],
  image: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
})
