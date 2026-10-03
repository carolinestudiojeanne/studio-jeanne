import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'

/** Journal : prévu pour plus tard, sans page sur le site tant que ce n'est pas décidé. */
export const article = defineType({
  name: 'article',
  title: 'Article du journal',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Adresse de la page', type: 'slug', options: {source: 'titre', maxLength: 70}, validation: (r) => r.required()}),
    defineField({name: 'date', title: 'Date', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'image', title: 'Image', type: 'imageAlt'}),
    defineField({name: 'texte', title: 'Texte', type: 'texteRiche'}),
    defineField({
      name: 'pageLiee',
      title: 'Page d’offre liée',
      type: 'string',
      options: {list: [{title: 'L’accompagnement', value: 'accompagnement'}, {title: 'Trouver votre bien', value: 'trouver-votre-bien'}]},
    }),
    defineField({name: 'seo', title: 'Référencement (Google)', type: 'seo'}),
  ],
})
