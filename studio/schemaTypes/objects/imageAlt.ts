import {defineField, defineType} from 'sanity'

/** Image avec texte alternatif obligatoire, utilisée partout sur le site. */
export const imageAlt = defineType({
  name: 'imageAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description:
        'Décrivez la photo en une phrase, avec la pièce et le lieu. Ex. : Cuisine en chêne clair et arche ocre, maison à Caudéran.',
      validation: (rule) =>
        rule.custom((alt, context) => {
          const parent = context.parent as {asset?: unknown} | undefined
          if (parent?.asset && !alt) return 'Le texte alternatif est obligatoire (Google et accessibilité).'
          return true
        }),
    }),
    defineField({
      name: 'legende',
      title: 'Légende',
      type: 'string',
      description: 'Facultatif. Affichée sous la photo.',
    }),
    defineField({
      name: 'rendu3D',
      title: 'C’est un rendu 3D',
      type: 'boolean',
      description: 'Cochez si l’image n’est pas une photo réelle : la mention « Rendu 3D » s’affichera dessous.',
      initialValue: false,
    }),
  ],
})
