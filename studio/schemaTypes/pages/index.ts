import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

/**
 * Pages fixes : un document unique par page, un groupe de champs par section.
 * L'ordre et la mise en page des sections sont codés dans le site.
 */

const seoField = defineField({name: 'seo', title: 'Référencement (Google)', type: 'seo', group: 'seo', validation: (r) => r.required()})
const groups = [
  {name: 'contenu', title: 'Contenu', default: true},
  {name: 'seo', title: 'Google'},
]
const appel = defineField({name: 'appel', title: 'Appel à l’action (bas de page)', type: 'appelAction', group: 'contenu'})
const faq = defineField({
  name: 'faq',
  title: 'Questions fréquentes',
  type: 'array',
  group: 'contenu',
  description: 'De 3 à 8 questions courtes, une par vraie question de client.',
  of: [defineArrayMember({type: 'questionReponse'})],
  validation: (r) => r.min(3).max(8),
})
const ancienneFaq = defineField({...faq, title: 'Anciennes questions fréquentes', hidden: true, validation: undefined})
const etapes = (title: string, description: string) =>
  defineField({
    name: 'etapes',
    title,
    type: 'array',
    group: 'contenu',
    description,
    of: [defineArrayMember({type: 'sectionTexteImage'})],
    validation: (r) => r.length(3).warning('La mise en page est prévue pour trois blocs.'),
  })

/** Le déroulé en arche (même arche sur L'accompagnement et Trouver votre bien, étapes propres à chaque page). */
const deroule = (ordre: string, apres: {title: string; description: string}) =>
  defineField({
    name: 'deroule',
    title: 'Le déroulé en arche',
    type: 'object',
    group: 'contenu',
    description:
      'Les étapes affichées le long de l’arche. Un clic sur une étape montre son texte et sa photo dans l’arche. Dans les textes, un retour à la ligne est repris tel quel sur le site.',
    options: {collapsible: true, collapsed: false},
    fields: [
      defineField({
        name: 'etapes',
        title: 'Les cinq étapes',
        type: 'array',
        description: ordre,
        of: [defineArrayMember({type: 'etapeArche'})],
        validation: (r) => r.length(5).warning('L’arche est prévue pour cinq étapes.'),
      }),
      defineField({name: 'travaux', type: 'etapeArche', ...apres}),
    ],
  })
const derouleAccompagnement = defineField({
  ...deroule('Dans l’ordre de l’arche : Écoute, Aménagement, Modélisation 3D (au sommet), Plans techniques, Sélection.', {
    title: 'Après l’arche : les travaux',
    description: 'Affiché après l’ouverture de l’arche, en pointillés : le moment où Caroline passe la main.',
  }),
  title: '3. Le déroulé en arche',
})
const derouleTrouver = defineField({
  ...deroule('Dans l’ordre de l’arche, du bas à gauche jusqu’à l’ouverture (la 3e étape est au sommet de la courbe).', {
    title: 'Après l’arche : l’aménagement',
    description: 'Affiché après l’ouverture de l’arche, en pointillés (« Et après ») : l’aménagement avec Studio Jeanne.',
  }),
  title: '3. Le déroulé en arche',
})

/** Une étape de l'arche (pages L'accompagnement et Trouver votre bien) : titre court, texte de deux lignes, photo verticale. */
export const etapeArche = defineType({
  name: 'etapeArche',
  title: 'Étape',
  type: 'object',
  fields: [
    defineField({name: 'titre', title: 'Titre (sur l’arche)', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'texte',
      title: 'Texte',
      type: 'text',
      rows: 3,
      description: 'Deux lignes environ. Passez à la ligne là où vous voulez que la phrase se coupe.',
    }),
    defineField({name: 'photo', title: 'Photo (verticale)', type: 'imageAlt', description: 'Format portrait de préférence ; recadrée en 3:4.'}),
  ],
  preview: {select: {title: 'titre', subtitle: 'texte', media: 'photo'}},
})

export const pageAccueil = defineType({
  name: 'pageAccueil',
  title: 'Accueil',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({
      name: 'hero',
      title: '1. Grand visuel',
      type: 'object',
      group: 'contenu',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'image', title: 'Photo', type: 'imageAlt', validation: (r) => r.required()}),
        defineField({
          name: 'h1',
          title: 'Petite ligne au-dessus de l’accroche',
          type: 'string',
          description: 'C’est le titre principal pour Google : gardez « architecte d’intérieur » et « Bordeaux ».',
        }),
        defineField({name: 'accroche', title: 'Accroche', type: 'string'}),
        defineField({name: 'sousTitre', title: 'Sous-titre', type: 'string'}),
        defineField({name: 'boutonLibelle', title: 'Texte du bouton', type: 'string', description: 'Le bouton mène à la page Contact.'}),
      ],
    }),
    defineField({
      name: 'projetsRecents',
      title: '2. Projets récents',
      type: 'object',
      group: 'contenu',
      description: 'Les projets affichés sont ceux cochés « Mettre en avant sur l’accueil ».',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'titre', title: 'Titre', type: 'string'}),
        defineField({name: 'texte', title: 'Phrase', type: 'text', rows: 2}),
        defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
      ],
    }),
    defineField({
      name: 'deroule',
      title: '3. Le déroulé',
      type: 'object',
      group: 'contenu',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'titre', title: 'Titre', type: 'string'}),
        defineField({name: 'texte', title: 'Texte', type: 'texteRiche'}),
        defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
      ],
    }),
    defineField({
      name: 'aiguillage',
      title: '4. Deux points de départ',
      type: 'object',
      group: 'contenu',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'titre', title: 'Titre', type: 'string'}),
        ...(['colonne1', 'colonne2'] as const).map((name, i) =>
          defineField({
            name,
            title: i === 0 ? 'Colonne « déjà votre maison » (vers L’accompagnement)' : 'Colonne « pas encore trouvée » (vers Trouver votre bien)',
            type: 'object',
            fields: [
              defineField({
                name: 'surtitre',
                title: 'Surtitre (petit, en ocre, facultatif)',
                type: 'string',
                description: 'Laisser vide pour ne rien afficher au-dessus du titre.',
              }),
              defineField({name: 'titre', title: 'Titre', type: 'string'}),
              defineField({name: 'texte', title: 'Texte', type: 'text', rows: 3}),
              defineField({name: 'boutonLibelle', title: 'Texte du bouton', type: 'string'}),
              defineField({
                name: 'photo',
                title: 'Photo (verticale)',
                type: 'imageAlt',
                description: 'S’affiche à droite du texte, comme les photos des étapes de l’arche.',
              }),
            ],
          }),
        ),
      ],
    }),
    defineField({
      name: 'caroline',
      title: '5. Caroline',
      type: 'object',
      group: 'contenu',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'image', title: 'Photo', type: 'imageAlt'}),
        defineField({name: 'texte', title: 'Texte', type: 'text', rows: 4}),
        defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
      ],
    }),
    defineField({
      name: 'avis',
      title: '6. Avis',
      type: 'object',
      group: 'contenu',
      description: 'Les avis affichés sont ceux cochés « Afficher sur l’accueil ». Le nombre d’avis se règle dans Réglages.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'titre', title: 'Titre', type: 'string'}),
        defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
      ],
    }),
    {...appel, title: '7. Appel à l’action'},
    seoField,
  ],
  preview: {prepare: () => ({title: 'Accueil'})},
})

export const pageProjets = defineType({
  name: 'pageProjets',
  title: 'Projets',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'intro', title: '1. Introduction', type: 'sectionTexte', group: 'contenu'}),
    defineField({
      name: 'blocPro',
      title: '3. Bloc Professionnels',
      type: 'object',
      group: 'contenu',
      description: 'En bas de la page, après la grille des projets. Mène à la page Professionnels.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'image', title: 'Image', type: 'imageAlt'}),
        defineField({name: 'titre', title: 'Titre', type: 'string'}),
        defineField({name: 'texte', title: 'Phrase', type: 'text', rows: 2}),
        defineField({name: 'lienLibelle', title: 'Texte du lien', type: 'string'}),
      ],
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Projets'})},
})

export const pageAccompagnement = defineType({
  name: 'pageAccompagnement',
  title: 'L’accompagnement',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'aiguillage', title: '1. Ligne vers Trouver votre bien', type: 'ligneAiguillage', group: 'contenu'}),
    defineField({name: 'intro', title: '2. Titre et introduction', type: 'sectionTexte', group: 'contenu'}),
    derouleAccompagnement,
    // Anciennes sections (trois temps, chantier, commandes) : plus affichées, gardées en réserve.
    defineField({...etapes('Ancien déroulé en trois temps', 'Plus affiché sur le site.'), hidden: true}),
    defineField({name: 'horsPerimetre', title: 'Ancien texte : le chantier', type: 'sectionTexte', group: 'contenu', hidden: true}),
    defineField({name: 'commandes', title: 'Ancien texte : les commandes', type: 'sectionTexte', group: 'contenu', hidden: true}),
    // Questions fréquentes : déplacées sur la page Contact (octobre 2026), gardées en réserve.
    ancienneFaq,
    appel,
    seoField,
  ],
  preview: {prepare: () => ({title: 'L’accompagnement'})},
})

export const pageTrouverVotreBien = defineType({
  name: 'pageTrouverVotreBien',
  title: 'Trouver votre bien',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'aiguillage', title: '1. Ligne vers L’accompagnement', type: 'ligneAiguillage', group: 'contenu'}),
    defineField({name: 'intro', title: '2. Titre et introduction', type: 'sectionTexte', group: 'contenu'}),
    derouleTrouver,
    // Anciennes sections (trois blocs, après l'achat, deux structures) : remplacées par l'arche, gardées en réserve.
    defineField({...etapes('Anciens trois blocs', 'Plus affiché sur le site.'), hidden: true}),
    defineField({name: 'apresAchat', title: 'Ancien texte : après l’achat', type: 'sectionTexte', group: 'contenu', hidden: true}),
    defineField({name: 'deuxStructures', title: 'Ancien texte : deux structures', type: 'sectionTexte', group: 'contenu', hidden: true}),
    ancienneFaq,
    appel,
    defineField({
      name: 'lienHomelikeLibelle',
      title: 'Texte du lien vers Homelike Home',
      type: 'string',
      group: 'contenu',
      description: 'Affiché tout en bas de la page, s’ouvre dans un nouvel onglet.',
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Trouver votre bien'})},
})

export const pageAPropos = defineType({
  name: 'pageAPropos',
  title: 'À propos',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'titre', title: 'Titre', type: 'string', group: 'contenu'}),
    defineField({name: 'texte', title: 'Texte', type: 'texteRiche', group: 'contenu'}),
    defineField({name: 'portrait', title: 'Portrait 1 (en haut à gauche)', type: 'imageAlt', group: 'contenu'}),
    defineField({
      name: 'portrait2',
      title: 'Portrait 2 (plus bas, à droite)',
      type: 'imageAlt',
      group: 'contenu',
      description: 'Les deux portraits s’affichent décalés en diagonale, à gauche du texte. Photos verticales de préférence.',
    }),
    defineField({name: 'imageEchoppe', title: 'Image de l’échoppe', type: 'imageAlt', group: 'contenu'}),
    defineField({name: 'lienAvisLibelle', title: 'Texte du lien vers les avis', type: 'string', group: 'contenu'}),
    appel,
    seoField,
  ],
  preview: {prepare: () => ({title: 'À propos'})},
})

export const pageContact = defineType({
  name: 'pageContact',
  title: 'Contact',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'intro', title: '1. Texte', type: 'sectionTexte', group: 'contenu'}),
    defineField({
      name: 'boutonLibelle',
      title: 'Texte du bouton vers le formulaire',
      type: 'string',
      group: 'contenu',
      description: 'Le formulaire Tally s’affiche dans la page ; ce bouton sert si le formulaire ne peut pas s’afficher.',
    }),
    defineField({
      name: 'coordonnees',
      title: '3. Phrase des coordonnées',
      type: 'string',
      group: 'contenu',
      description: 'Le téléphone et l’e-mail (pris dans les Réglages) sont ajoutés automatiquement, cliquables.',
    }),
    defineField({
      name: 'pro',
      title: '2. Troisième arche : les professionnels',
      type: 'object',
      group: 'contenu',
      description: 'Les deux premières arches reprennent les textes de l’accueil (« 4. Deux points de départ »).',
      fields: [
        defineField({name: 'titre', title: 'Titre', type: 'string', description: 'Par défaut : « Vous êtes un professionnel. »'}),
        defineField({name: 'texte', title: 'Phrase', type: 'text', rows: 2}),
        defineField({name: 'boutonLibelle', title: 'Texte du bouton', type: 'string', description: 'Par défaut : « Parlons de vos locaux ».'}),
      ],
    }),
    defineField({name: 'zone', title: '4. Zone d’intervention (ligne sous le titre)', type: 'sectionTexte', group: 'contenu'}),
    defineField({...faq, title: '5. Questions fréquentes'}),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Contact'})},
})

export const pageProfessionnels = defineType({
  name: 'pageProfessionnels',
  title: 'Professionnels',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'intro', title: '1. Introduction', type: 'sectionTexte', group: 'contenu'}),
    appel,
    seoField,
  ],
  preview: {prepare: () => ({title: 'Professionnels'})},
})

export const pageAvisClients = defineType({
  name: 'pageAvisClients',
  title: 'Avis clients',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({name: 'intro', title: '1. Introduction', type: 'sectionTexte', group: 'contenu'}),
    appel,
    seoField,
  ],
  preview: {prepare: () => ({title: 'Avis clients'})},
})

export const pagesFixes = [
  pageAccueil,
  pageProjets,
  pageAccompagnement,
  pageTrouverVotreBien,
  pageAPropos,
  pageContact,
  pageProfessionnels,
  pageAvisClients,
]
