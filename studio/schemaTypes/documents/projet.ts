import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {HomeIcon} from '@sanity/icons/Home'
import {COMMUNES} from '../communes'

export {COMMUNES}


const FRAGMENTS = ['cuisine', 'chambre', 'suite', 'dressing', 'salle de bain', 'salle de bains', 'palier']

/** Compte les mots d'un texte riche Sanity. */
function compterMots(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0
  return blocks
    .flatMap((b: {children?: {text?: string}[]}) => b.children || [])
    .map((c) => c.text || '')
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
}

export const projet = defineType({
  name: 'projet',
  title: 'Projet',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'essentiel', title: '1. L’essentiel', default: true},
    {name: 'textes', title: '2. Les textes'},
    {name: 'images', title: '3. Les images'},
    {name: 'plus', title: '4. En plus'},
    {name: 'seo', title: '5. Google'},
  ],
  fields: [
    orderRankField({type: 'projet', hidden: true}),

    // 1. L'essentiel
    defineField({
      name: 'titre',
      title: 'Titre du projet',
      type: 'string',
      group: 'essentiel',
      description:
        'Type de bien entier + nom de rue : « Maison Ornano », « Appartement Fenelon ». Jamais une seule pièce (« Cuisine Le Bouscat »).',
      validation: (rule) => [
        rule.required().error('Le titre est obligatoire.'),
        rule.custom((titre) => {
          if (!titre) return true
          const t = titre.toLowerCase()
          if (FRAGMENTS.some((f) => t.startsWith(f)))
            return 'Ce titre annonce une seule pièce. Préférez le bien entier : « Maison Kennedy » plutôt que « Cuisine Le Bouscat ».'
          return true
        }).warning(),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Adresse de la page',
      type: 'slug',
      group: 'essentiel',
      description:
        'Cliquez sur « Générer ». Ex. : maison-ornano donne studio-jeanne.com/projets/maison-ornano. Ne la changez plus une fois le projet publié.',
      options: {source: 'titre', maxLength: 60},
      validation: (rule) => rule.required().error('Générez l’adresse de la page.'),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      group: 'essentiel',
      description: 'Professionnel : le projet s’affiche sur la page Professionnels, pas dans la page Projets.',
      options: {
        list: [
          {title: 'Résidentiel', value: 'residentiel'},
          {title: 'Professionnel', value: 'professionnel'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'residentiel',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'typeDeBien',
      title: 'Type de bien',
      type: 'string',
      group: 'essentiel',
      description: 'Ex. : Maison, Appartement, Échoppe double, Restaurant.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'typeDeProjet',
      title: 'Type de projet',
      type: 'string',
      group: 'essentiel',
      description: 'Ex. : Rénovation complète, Décoration, Conception d’une cuisine.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'commune',
      title: 'Commune',
      type: 'string',
      group: 'essentiel',
      options: {list: [...COMMUNES, {title: 'Autre', value: 'autre'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'communeAutre',
      title: 'Nom de la commune',
      type: 'string',
      group: 'essentiel',
      hidden: ({parent}) => parent?.commune !== 'autre',
      validation: (rule) =>
        rule.custom((v, ctx) =>
          (ctx.parent as {commune?: string})?.commune === 'autre' && !v ? 'Indiquez la commune.' : true,
        ),
    }),
    defineField({
      name: 'departement',
      title: 'Département',
      type: 'string',
      group: 'essentiel',
      description: 'Utilisé dans la ligne de lieu et pour Google.',
      initialValue: 'Gironde',
    }),
    defineField({
      name: 'porteDEntree',
      title: 'Point de départ du client',
      type: 'string',
      group: 'essentiel',
      description: 'Facultatif. « Avant achat » relie le projet à la page Trouver votre bien.',
      options: {
        list: [
          {title: 'Avant achat (bien trouvé avec Caroline)', value: 'avant-achat'},
          {title: 'Achat récent', value: 'achat-recent'},
          {title: 'Transformation différée', value: 'transformation-differee'},
        ],
      },
    }),
    defineField({name: 'annee', title: 'Année', type: 'number', group: 'essentiel', validation: (r) => r.min(2015).max(2100).integer()}),
    defineField({name: 'surface', title: 'Surface (m²)', type: 'number', group: 'essentiel', validation: (r) => r.positive()}),
    defineField({
      name: 'resume',
      title: 'Résumé',
      type: 'text',
      rows: 2,
      group: 'essentiel',
      description: 'Une ou deux phrases, utilisées sur les cartes de projet et au partage. 160 caractères maximum.',
      validation: (rule) => [rule.required().error('Le résumé est obligatoire.'), rule.max(160).warning('Plus court, c’est mieux : 160 caractères maximum.')],
    }),

    // 2. Les textes
    defineField({
      name: 'contexte',
      title: 'Le contexte',
      type: 'texteRiche',
      group: 'textes',
      description: 'Le bien et sa situation, en quelques phrases.',
      validation: (rule) => rule.required().error('Décrivez le contexte.'),
    }),
    defineField({
      name: 'demande',
      title: 'La demande',
      type: 'texteRiche',
      group: 'textes',
      description: 'Ce que voulaient les clients.',
      validation: (rule) => rule.required().error('Décrivez la demande.'),
    }),
    defineField({
      name: 'realisation',
      title: 'Ce qui a été fait',
      type: 'texteRiche',
      group: 'textes',
      description: 'Citez les pièces, les matériaux et la commune, naturellement. 150 mots au moins.',
      validation: (rule) => [
        rule.required().error('Décrivez ce qui a été fait.'),
        rule
          .custom((v) => (compterMots(v) > 0 && compterMots(v) < 150 ? `Texte un peu court (${compterMots(v)} mots) : 150 mots au moins aident Google à comprendre le projet.` : true))
          .warning(),
      ],
    }),

    // 3. Les images
    defineField({
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'imageAlt',
      group: 'images',
      description: 'Photo réelle, format paysage, la plus forte du projet. Elle s’affiche en grand en haut de la page et sur les cartes.',
      validation: (rule) => rule.required().error('L’image principale est obligatoire.'),
    }),
    defineField({
      name: 'galerie',
      title: 'Galerie',
      type: 'array',
      group: 'images',
      description: 'Trois photos au moins. Glissez-déposez pour changer l’ordre.',
      of: [defineArrayMember({type: 'imageGalerie'})],
      options: {layout: 'list'},
      validation: (rule) => rule.min(3).error('Ajoutez au moins trois photos.'),
    }),
    defineField({
      name: 'avantApres',
      title: 'Avant / après',
      type: 'array',
      group: 'images',
      description: 'Facultatif. Une paire d’images par pièce.',
      of: [defineArrayMember({type: 'avantApres'})],
    }),
    defineField({name: 'video', title: 'Vidéo', type: 'video', group: 'images'}),

    // 4. En plus
    defineField({name: 'retourClient', title: 'Le retour du client', type: 'retourClient', group: 'plus'}),
    defineField({
      name: 'projetsLies',
      title: 'Autres projets à montrer en bas de page',
      type: 'array',
      group: 'plus',
      description: 'Trois au maximum. Laissez vide : le site en choisit automatiquement (même commune ou même type de bien).',
      of: [defineArrayMember({type: 'reference', to: [{type: 'projet'}], options: {disableNew: true}})],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'miseEnAvantAccueil',
      title: 'Mettre en avant sur l’accueil',
      type: 'boolean',
      group: 'plus',
      description: 'Le projet apparaît dans « Projets récents » sur la page d’accueil (3 ou 4 projets au total).',
      initialValue: false,
    }),

    // 5. Google
    defineField({
      name: 'seo',
      title: 'Référencement (Google)',
      type: 'seo',
      group: 'seo',
      description:
        'Titre automatique si vide : « Maison Ornano, rénovation complète à Mérignac · Studio Jeanne ».',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {title: 'titre', commune: 'commune', autre: 'communeAutre', categorie: 'categorie', media: 'imagePrincipale'},
    prepare: ({title, commune, autre, categorie, media}) => ({
      title,
      subtitle: [commune === 'autre' ? autre : commune, categorie === 'professionnel' ? 'Professionnel' : null]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
})
