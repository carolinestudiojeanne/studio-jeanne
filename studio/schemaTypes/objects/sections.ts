import {defineField, defineType} from 'sanity'

/**
 * Groupes de champs réutilisés par les pages fixes.
 * La mise en page de chaque section est codée : Caroline ne remplit que le contenu.
 */

export const sectionTexte = defineType({
  name: 'sectionTexte',
  title: 'Section texte',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string'}),
    defineField({name: 'texte', title: 'Texte', type: 'texteRiche'}),
  ],
})

export const sectionTexteImage = defineType({
  name: 'sectionTexteImage',
  title: 'Section texte et image',
  type: 'object',
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'texte', title: 'Texte', type: 'texteRiche'}),
    defineField({name: 'image', title: 'Image', type: 'imageAlt'}),
  ],
  preview: {select: {title: 'titre', media: 'image'}},
})

export const appelAction = defineType({
  name: 'appelAction',
  title: 'Appel à l’action (bas de page)',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string'}),
    defineField({name: 'texte', title: 'Phrase', type: 'text', rows: 3}),
    defineField({
      name: 'boutonLibelle',
      title: 'Texte du bouton',
      type: 'string',
      description: 'Le bouton mène toujours à la page Contact.',
    }),
  ],
})

export const ligneAiguillage = defineType({
  name: 'ligneAiguillage',
  title: 'Ligne d’aiguillage (haut de page)',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({name: 'texte', title: 'Question', type: 'string'}),
    defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
  ],
})

export const questionReponse = defineType({
  name: 'questionReponse',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'reponse',
      title: 'Réponse',
      type: 'text',
      rows: 4,
      description: 'Répondez dès la première phrase, simplement. C’est ce que Google et les assistants IA reprennent.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'question', subtitle: 'reponse'}},
})
