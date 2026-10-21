import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

/**
 * Carte de visite de Caroline (www.studio-jeanne.com/carte) et sa fiche contact (/caroline-canova.vcf).
 * Un champ laissé vide reprend le texte ou la photo d'origine.
 */

/** Image recadrable (point focal) avec texte alternatif. */
const image = (name: string, title: string, description: string, group?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    ...(group && {group}),
    description,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Texte alternatif',
        type: 'string',
        description: 'Décrivez l’image en une phrase (lu par les lecteurs d’écran).',
        validation: (rule) =>
          rule.custom((alt, context) => {
            const parent = context.parent as {asset?: unknown} | undefined
            if (parent?.asset && !alt) return 'Le texte alternatif est obligatoire.'
            return true
          }),
      }),
    ],
  })

const lien = (name: string, title: string) =>
  defineArrayMember({
    name,
    title,
    type: 'object',
    fields: [
      defineField({name: 'libelle', title: 'Texte', type: 'string', validation: (r) => r.required()}),
      defineField({
        name: 'url',
        title: 'Adresse',
        type: 'url',
        description: 'Adresse complète, avec https://',
        validation: (r) => r.required().uri({scheme: ['https', 'http']}),
      }),
    ],
    preview: {select: {title: 'libelle', subtitle: 'url'}},
  })

export const carteVisite = defineType({
  name: 'carteVisite',
  title: 'Carte de visite',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'identite', title: 'Identité', default: true},
    {name: 'coordonnees', title: 'Coordonnées'},
    {name: 'travail', title: 'Photos et boutons'},
    {name: 'fiche', title: 'Fiche contact'},
    {name: 'partage', title: 'Aperçu du lien'},
  ],
  fields: [
    // Identité
    defineField({name: 'prenom', title: 'Prénom', type: 'string', group: 'identite', initialValue: 'Caroline'}),
    defineField({name: 'nom', title: 'Nom', type: 'string', group: 'identite', initialValue: 'Canova'}),
    image('portrait', 'Portrait', 'Affiché en haut de la carte, au format vertical.', 'identite'),
    defineField({
      name: 'metiers',
      title: 'Métiers',
      type: 'array',
      group: 'identite',
      description: 'Une ligne par métier, sous le nom. La première est en gras.',
      of: [
        defineArrayMember({
          name: 'metier',
          title: 'Métier',
          type: 'object',
          fields: [
            defineField({name: 'metier', title: 'Métier', type: 'string', description: 'Ex. : Chasseuse en immobilier', validation: (r) => r.required()}),
            defineField({name: 'structure', title: 'Structure', type: 'string', description: 'En ocre après la virgule. Ex. : Homelike Home'}),
          ],
          preview: {select: {title: 'metier', subtitle: 'structure'}},
        }),
      ],
    }),
    defineField({
      name: 'boutonAjouter',
      title: 'Bouton « Ajouter le contact »',
      type: 'string',
      group: 'identite',
      description: 'Texte du bouton qui enregistre la fiche contact dans le téléphone.',
    }),
    defineField({name: 'intro', title: 'Présentation', type: 'text', rows: 5, group: 'identite', description: 'Le paragraphe sous le bouton.'}),

    // Coordonnées
    defineField({name: 'titreContact', title: 'Titre de la rubrique', type: 'string', group: 'coordonnees', description: 'Ex. : Me joindre'}),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
      group: 'coordonnees',
      description: 'Tel qu’il s’affiche, ex. : 06 62 87 09 96.',
      validation: (r) => r.regex(/^[+\d][\d .]{8,}$/, {name: 'téléphone'}).error('Chiffres et espaces uniquement, ex. : 06 62 87 09 96.'),
    }),
    defineField({
      name: 'emails',
      title: 'Adresses e-mail',
      type: 'array',
      group: 'coordonnees',
      description: 'La première est l’adresse principale de la fiche contact.',
      of: [defineArrayMember({type: 'string', validation: (r) => r.email()})],
    }),

    // Photos et boutons
    defineField({name: 'titreTravail', title: 'Titre de la rubrique', type: 'string', group: 'travail'}),
    defineField({name: 'sousTitreTravail', title: 'Phrase sous le titre', type: 'text', rows: 2, group: 'travail'}),
    defineField({
      name: 'photos',
      title: 'Photos de projets',
      type: 'array',
      group: 'travail',
      description: 'La première s’affiche en grand (format paysage), les suivantes deux par deux (format vertical).',
      of: [
        defineArrayMember({
          name: 'photo',
          title: 'Photo',
          type: 'object',
          fields: [
            image('image', 'Photo', 'Le point focal choisi reste visible quel que soit le recadrage.'),
            defineField({name: 'lieu', title: 'Lieu', type: 'string', description: 'Affiché sous la photo. Ex. : Pessac'}),
          ],
          preview: {select: {title: 'lieu', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'boutons',
      title: 'Boutons',
      type: 'array',
      group: 'travail',
      description: 'Les deux premiers côte à côte (le premier en ocre plein), les suivants en pleine largeur.',
      of: [lien('bouton', 'Bouton')],
    }),
    image('logoClair', 'Logo (fond clair)', 'En bas de la carte, affiché quand le téléphone est en mode clair.', 'travail'),
    image('logoSombre', 'Logo (fond sombre)', 'Même logo en version claire, affiché quand le téléphone est en mode sombre.', 'travail'),
    defineField({name: 'mentionBas', title: 'Mention en bas de la carte', type: 'string', group: 'travail'}),

    // Fiche contact (.vcf)
    defineField({
      name: 'ficheOrganisation',
      title: 'Société',
      type: 'string',
      group: 'fiche',
      description: 'Enregistrée dans le contact du téléphone. Le nom, le téléphone et les e-mails viennent de la carte.',
    }),
    defineField({name: 'ficheFonction', title: 'Fonction', type: 'string', group: 'fiche'}),
    defineField({name: 'ficheNote', title: 'Note', type: 'text', rows: 3, group: 'fiche'}),
    defineField({
      name: 'ficheLiens',
      title: 'Sites web',
      type: 'array',
      group: 'fiche',
      description: 'Liens enregistrés dans le contact, avec leur nom.',
      of: [lien('site', 'Site')],
    }),

    // Aperçu du lien (WhatsApp, iMessage, mail)
    defineField({name: 'titreOnglet', title: 'Titre de l’onglet', type: 'string', group: 'partage'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      group: 'partage',
      description: 'Affichée sous le nom dans l’aperçu du lien.',
    }),
    image(
      'imagePartage',
      'Image de l’aperçu',
      'Format paysage, recadrée en 1200 × 630. Quand vous la changez, WhatsApp peut garder l’ancienne quelques jours.',
      'partage',
    ),
  ],
  preview: {prepare: () => ({title: 'Carte de visite'})},
})
