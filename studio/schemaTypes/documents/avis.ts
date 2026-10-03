import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const avis = defineType({
  name: 'avis',
  title: 'Avis client',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({name: 'prenom', title: 'Prénom', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'texte',
      title: 'Texte de l’avis',
      type: 'text',
      rows: 6,
      description: 'Collé tel quel, sans le modifier.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'number',
      options: {list: [5, 4, 3, 2, 1]},
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'DD/MM/YYYY'}, validation: (r) => r.required()}),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {list: ['Google', 'Autre'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'Google',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'projet',
      title: 'Projet concerné',
      type: 'reference',
      to: [{type: 'projet'}],
      options: {disableNew: true},
      description: 'Facultatif.',
    }),
    defineField({
      name: 'miseEnAvantAccueil',
      title: 'Afficher sur l’accueil',
      type: 'boolean',
      description: 'Deux ou trois avis au maximum sur l’accueil.',
      initialValue: false,
    }),
  ],
  orderings: [{title: 'Plus récents', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'prenom', subtitle: 'texte', accueil: 'miseEnAvantAccueil'},
    prepare: ({title, subtitle, accueil}) => ({title: accueil ? `${title} · sur l’accueil` : title, subtitle}),
  },
})
