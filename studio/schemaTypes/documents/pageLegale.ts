import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const pageLegale = defineType({
  name: 'pageLegale',
  title: 'Page légale',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'texte', title: 'Texte', type: 'texteRiche'}),
    defineField({name: 'miseAJour', title: 'Date de mise à jour', type: 'date', options: {dateFormat: 'DD/MM/YYYY'}}),
    defineField({name: 'seo', title: 'Référencement (Google)', type: 'seo'}),
  ],
})
