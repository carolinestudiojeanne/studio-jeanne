import {defineField, defineType} from 'sanity'

export const imageGalerie = defineType({
  name: 'imageGalerie',
  title: 'Photo de la galerie',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Photo', type: 'imageAlt', validation: (r) => r.required()}),
    defineField({
      name: 'affichage',
      title: 'Affichage',
      type: 'string',
      options: {
        list: [
          {title: 'Pleine largeur', value: 'pleine'},
          {title: 'Par paire (côte à côte avec la suivante)', value: 'paire'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'pleine',
    }),
  ],
  preview: {
    select: {media: 'image', title: 'image.alt', affichage: 'affichage'},
    prepare: ({media, title, affichage}) => ({
      media,
      title: title || 'Photo sans texte alternatif',
      subtitle: affichage === 'paire' ? 'Par paire' : 'Pleine largeur',
    }),
  },
})

export const avantApres = defineType({
  name: 'avantApres',
  title: 'Avant / après',
  type: 'object',
  fields: [
    defineField({name: 'avant', title: 'Avant', type: 'imageAlt', validation: (r) => r.required()}),
    defineField({name: 'apres', title: 'Après', type: 'imageAlt', validation: (r) => r.required()}),
    defineField({name: 'legende', title: 'Légende', type: 'string', description: 'Ex. : Le salon, ouvert sur la cuisine.'}),
  ],
  preview: {select: {media: 'apres', title: 'legende'}, prepare: ({media, title}) => ({media, title: title || 'Avant / après'})},
})

export const retourClient = defineType({
  name: 'retourClient',
  title: 'Le retour du client',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({name: 'citation', title: 'Citation', type: 'text', rows: 4, description: 'Peut reprendre un avis Google, tel quel.'}),
    defineField({name: 'prenom', title: 'Prénom', type: 'string'}),
  ],
})

export const video = defineType({
  name: 'video',
  title: 'Vidéo',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'fichier',
      title: 'Fichier vidéo',
      type: 'file',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Vidéo courte en MP4 (moins d’une minute, idéalement moins de 20 Mo). Elle se lit sans le son.',
    }),
    defineField({
      name: 'lien',
      title: 'Ou lien Vimeo / YouTube',
      type: 'url',
      description: 'Pour une vidéo longue. Laissez vide si vous avez déposé un fichier.',
    }),
    defineField({
      name: 'imageAttente',
      title: 'Image d’attente',
      type: 'imageAlt',
      description: 'Affichée avant la lecture.',
    }),
  ],
})
