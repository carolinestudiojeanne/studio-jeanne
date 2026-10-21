import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {schemaTypes, SINGLETONS} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'a-remplacer'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const siteUrl = (process.env.SANITY_STUDIO_SITE_URL || 'http://localhost:4321').replace(/\/$/, '')
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET || ''

// Types qu'on ne crée pas depuis le bouton « + » (documents uniques et pages légales).
const NON_CREABLES = new Set([...SINGLETONS, 'pageLegale'])

export default defineConfig({
  name: 'studio-jeanne',
  title: 'Studio Jeanne',
  projectId,
  dataset,
  plugins: [structureTool({structure}), frFRLocale(), visionTool({title: 'Requêtes (Edith)'})],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !NON_CREABLES.has(schemaType)),
  },
  document: {
    // Pages uniques : pas de duplication ni de suppression.
    actions: (actions, {schemaType}) =>
      NON_CREABLES.has(schemaType)
        ? actions.filter(({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
        : actions,
    newDocumentOptions: (items, {creationContext}) =>
      creationContext.type === 'global' ? items.filter((i) => !NON_CREABLES.has(i.templateId)) : items,
    // Bouton « Voir la page » (menu ⋯ en haut à droite d'un projet).
    productionUrl: async (prev, {document}) => {
      if (document._type === 'carteVisite') return `${siteUrl}/carte`
      if (document._type !== 'projet') return prev
      const id = document._id.replace(/^drafts\./, '')
      return `${siteUrl}/apercu/${id}?secret=${encodeURIComponent(previewSecret)}`
    },
  },
})
