import {defineField, defineType} from 'sanity'
import {CharCountInput} from '../../components/CharCountInput'

/** Référencement : title, meta description, image de partage. */
export const seo = defineType({
  name: 'seo',
  title: 'Référencement (Google)',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre pour Google',
      type: 'string',
      description:
        'Le titre bleu dans les résultats Google. 60 caractères maximum. Laissez vide pour un titre automatique.',
      options: {maxLength: 60} as object,
      components: {input: CharCountInput},
      validation: (rule) => rule.max(60).warning('Au-delà de 60 caractères, Google coupe le titre.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description pour Google',
      type: 'text',
      rows: 3,
      description: 'Une phrase qui donne envie de cliquer, avec le lieu. 155 caractères maximum.',
      options: {maxLength: 155} as object,
      components: {input: CharCountInput},
      validation: (rule) => [
        rule.required().error('La description est obligatoire.'),
        rule.max(155).warning('Au-delà de 155 caractères, Google coupe la description.'),
      ],
    }),
    defineField({
      name: 'imagePartage',
      title: 'Image de partage',
      type: 'imageAlt',
      description: 'Facultatif. Image affichée quand la page est partagée (WhatsApp, LinkedIn…). Sinon, l’image principale.',
    }),
  ],
})
