import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const reglages = defineType({
  name: 'reglages',
  title: 'Réglages du site',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'coordonnees', title: 'Coordonnées', default: true},
    {name: 'liens', title: 'Liens'},
    {name: 'avis', title: 'Avis Google'},
    {name: 'seo', title: 'Google'},
  ],
  fields: [
    defineField({name: 'telephone', title: 'Téléphone', type: 'string', group: 'coordonnees', validation: (r) => r.required()}),
    defineField({name: 'email', title: 'E-mail', type: 'string', group: 'coordonnees', validation: (r) => r.required().email()}),
    defineField({name: 'adresse', title: 'Adresse', type: 'string', group: 'coordonnees'}),
    defineField({name: 'codePostal', title: 'Code postal', type: 'string', group: 'coordonnees'}),
    defineField({name: 'ville', title: 'Ville', type: 'string', group: 'coordonnees', initialValue: 'Bordeaux'}),
    defineField({
      name: 'afficherAdresse',
      title: 'Afficher l’adresse complète sur le site',
      type: 'boolean',
      group: 'coordonnees',
      description: 'Sinon, seule la ville et la zone d’intervention s’affichent.',
      initialValue: false,
    }),
    defineField({
      name: 'zone',
      title: 'Zone d’intervention',
      type: 'string',
      group: 'coordonnees',
      initialValue: 'Bordeaux, Gironde et côte atlantique',
    }),
    defineField({
      name: 'phraseLocale',
      title: 'Phrase du pied de page',
      type: 'text',
      rows: 3,
      group: 'coordonnees',
      description: 'Une phrase qui dit qui vous êtes et où vous intervenez. Elle s’affiche sur toutes les pages.',
    }),

    defineField({name: 'lienTally', title: 'Lien du formulaire Tally', type: 'url', group: 'liens', description: 'Ex. : https://tally.so/r/abc123'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url', group: 'liens'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'liens'}),
    defineField({name: 'ficheGoogle', title: 'Fiche Google', type: 'url', group: 'liens'}),
    defineField({name: 'lienLaisserAvis', title: 'Lien « Laisser un avis »', type: 'url', group: 'liens'}),
    defineField({name: 'homelikehome', title: 'Site Homelike Home', type: 'url', group: 'liens', initialValue: 'https://www.homelikehome.com'}),

    defineField({name: 'nombreAvis', title: 'Nombre d’avis Google', type: 'number', group: 'avis', validation: (r) => r.integer().min(0)}),
    defineField({name: 'noteGoogle', title: 'Note moyenne Google', type: 'number', group: 'avis', initialValue: 5, validation: (r) => r.min(1).max(5)}),

    defineField({
      name: 'suffixeTitre',
      title: 'Fin des titres Google',
      type: 'string',
      group: 'seo',
      initialValue: ' · Studio Jeanne',
      description: 'Ajoutée à la fin des titres automatiques.',
    }),
    defineField({name: 'imagePartage', title: 'Image de partage par défaut', type: 'imageAlt', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Réglages du site'})},
})
