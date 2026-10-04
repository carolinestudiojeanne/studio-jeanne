/**
 * Contenu d'exemple, affiché tant que le site n'est pas relié à Sanity.
 * Les textes des pages viennent de l'annexe du brief de Caroline.
 * Les projets et les avis sont des exemples : ils seront remplacés par les vrais dans Sanity.
 */
import {paragraphes} from './texte'
import type {
  Avis,
  ImageData,
  PageAccueil,
  PageAPropos,
  PageContact,
  PageLegale,
  PageOffre,
  PageProjets,
  PageSimple,
  Projet,
  Reglages,
} from './types'

const img = (nom: string, alt: string, format: 'paysage' | 'portrait' = 'paysage', extra: Partial<ImageData> = {}): ImageData => ({
  src: `/exemples/${nom}-${format}.svg`,
  width: format === 'paysage' ? 1600 : 1067,
  height: format === 'paysage' ? 1067 : 1400,
  alt,
  ...extra,
})

export const reglages: Reglages = {
  telephone: '06 62 87 09 96',
  email: 'caroline@studio-jeanne.com',
  adresse: '29 rue Jeanne',
  codePostal: '33200',
  ville: 'Bordeaux',
  afficherAdresse: false,
  zone: 'Bordeaux, Gironde et côte atlantique',
  phraseLocale:
    'Studio Jeanne, architecte d’intérieur à Bordeaux, accompagne les projets de rénovation à Caudéran, au Bouscat, à Mérignac, en Gironde et sur la côte atlantique.',
  lienTally: '',
  instagram: 'https://www.instagram.com/studio._.jeanne/',
  linkedin: 'https://www.linkedin.com/in/caroline-canova-0401a571',
  ficheGoogle: '',
  lienLaisserAvis: '',
  homelikehome: 'https://www.homelikehome.com',
  nombreAvis: 53,
  noteGoogle: 5,
  suffixeTitre: ' · Studio Jeanne',
}

const texteRealisation = (lieu: string) =>
  paragraphes(
    `Texte d’exemple. Ici, Caroline décrit ce qui a été fait, pièce par pièce, avec les matériaux et la commune : ${lieu}.`,
    'La cuisine s’ouvre sur la pièce de vie, avec des façades en chêne clair et un plan de travail en pierre. Une arche reprend la courbe des fenêtres anciennes et sépare l’entrée du séjour sans fermer l’espace.',
    'À l’étage, la suite parentale réunit chambre, dressing et salle de bain. Les teintes restent douces, le lin et la terre cuite réchauffent la lumière du nord.',
  )

export const projets: Projet[] = [
  // Les 8 projets à mettre en ligne (liste du 4 octobre 2026). Textes, photos et chiffres : exemples à remplacer.
  {
    _id: 'exemple-la-rochelle',
    titre: 'Appartement La Rochelle',
    slug: 'appartement-la-rochelle',
    categorie: 'residentiel',
    typeDeBien: 'Appartement',
    typeDeProjet: 'Rénovation complète',
    commune: 'La Rochelle',
    departement: 'Charente-Maritime',
    resume: 'Un appartement rénové à La Rochelle, à deux pas de l’océan.',
    imagePrincipale: img('lin', 'Appartement La Rochelle'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('La Rochelle'),
    galerie: [
      {image: img('sauge', 'Séjour, Appartement La Rochelle', 'portrait'), affichage: 'paire'},
      {image: img('creme', 'Chambre, Appartement La Rochelle', 'portrait'), affichage: 'pleine'},
      {image: img('chene', 'Cuisine, Appartement La Rochelle', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Salle d’eau, Appartement La Rochelle', 'portrait'), affichage: 'pleine'},
      {image: img('lin', 'Entrée, Appartement La Rochelle', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation complète – Appartement La Rochelle, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-replay',
    titre: 'Bar-restaurant Le Replay',
    slug: 'le-replay',
    categorie: 'professionnel',
    typeDeBien: 'Restaurant',
    typeDeProjet: 'Aménagement',
    commune: 'Bordeaux',
    departement: 'Gironde',
    resume: 'Aménagement d’un bar-restaurant à Bordeaux.',
    imagePrincipale: img('ardoise', 'Bar-restaurant Le Replay'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('ocre', 'Comptoir, Bar-restaurant Le Replay', 'portrait'), affichage: 'paire'},
      {image: img('creme', 'Bar, Bar-restaurant Le Replay', 'portrait'), affichage: 'pleine'},
      {image: img('chene', 'Salle, Bar-restaurant Le Replay', 'portrait'), affichage: 'pleine'},
      {image: img('lin', 'Terrasse, Bar-restaurant Le Replay', 'portrait'), affichage: 'pleine'},
      {image: img('ardoise', 'Banquettes, Bar-restaurant Le Replay', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Aménagement – Bar-restaurant Le Replay, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-cuisine-bouscat',
    titre: 'Cuisine Le Bouscat',
    slug: 'cuisine-le-bouscat',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Rénovation partielle',
    commune: 'Le Bouscat',
    departement: 'Gironde',
    resume: 'Une cuisine repensée au cœur d’une maison familiale du Bouscat.',
    imagePrincipale: img('creme', 'Cuisine Le Bouscat'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Le Bouscat'),
    galerie: [
      {image: img('chene', 'Îlot, Cuisine Le Bouscat', 'portrait'), affichage: 'paire'},
      {image: img('lin', 'Cuisine, Cuisine Le Bouscat', 'portrait'), affichage: 'pleine'},
      {image: img('sauge', 'Rangements, Cuisine Le Bouscat', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Coin repas, Cuisine Le Bouscat', 'portrait'), affichage: 'pleine'},
      {image: img('creme', 'Plan de travail, Cuisine Le Bouscat', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation partielle – Cuisine Le Bouscat, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-echoppe-merignac',
    titre: 'Échoppe double Mérignac',
    slug: 'echoppe-double-merignac',
    categorie: 'residentiel',
    typeDeBien: 'Échoppe',
    typeDeProjet: 'Rénovation complète',
    commune: 'Mérignac',
    departement: 'Gironde',
    resume: 'Une échoppe double entièrement rénovée à Mérignac.',
    imagePrincipale: img('chene', 'Échoppe double Mérignac'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Mérignac'),
    galerie: [
      {image: img('creme', 'Pièce de vie, Échoppe double Mérignac', 'portrait'), affichage: 'paire'},
      {image: img('lin', 'Cuisine, Échoppe double Mérignac', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Chambre, Échoppe double Mérignac', 'portrait'), affichage: 'pleine'},
      {image: img('sauge', 'Salle de bain, Échoppe double Mérignac', 'portrait'), affichage: 'pleine'},
      {image: img('chene', 'Jardin, Échoppe double Mérignac', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation complète – Échoppe double Mérignac, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-etage-echoppe-bordeaux',
    titre: 'Étage échoppe double Bordeaux',
    slug: 'etage-echoppe-double-bordeaux',
    categorie: 'residentiel',
    typeDeBien: 'Échoppe',
    typeDeProjet: 'Rénovation partielle',
    commune: 'Bordeaux',
    departement: 'Gironde',
    resume: 'L’étage d’une échoppe double bordelaise, réaménagé en espace nuit.',
    imagePrincipale: img('sauge', 'Étage échoppe double Bordeaux'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('lin', 'Chambre, Étage échoppe double Bordeaux', 'portrait'), affichage: 'paire'},
      {image: img('creme', 'Palier, Étage échoppe double Bordeaux', 'portrait'), affichage: 'pleine'},
      {image: img('chene', 'Salle d’eau, Étage échoppe double Bordeaux', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Dressing, Étage échoppe double Bordeaux', 'portrait'), affichage: 'pleine'},
      {image: img('sauge', 'Bureau, Étage échoppe double Bordeaux', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation partielle – Étage échoppe double Bordeaux, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-rdc-cauderan',
    titre: 'RDC d’une maison Caudéran',
    slug: 'rdc-maison-cauderan',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Rénovation partielle',
    commune: 'Caudéran',
    departement: 'Gironde',
    resume: 'Le rez-de-chaussée d’une maison de Caudéran, ouvert et réorganisé.',
    imagePrincipale: img('ocre', 'RDC d’une maison Caudéran'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Caudéran'),
    galerie: [
      {image: img('creme', 'Séjour, RDC d’une maison Caudéran', 'portrait'), affichage: 'paire'},
      {image: img('chene', 'Cuisine, RDC d’une maison Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('lin', 'Entrée, RDC d’une maison Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('sauge', 'Salle à manger, RDC d’une maison Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Bibliothèque, RDC d’une maison Caudéran', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation partielle – RDC d’une maison Caudéran, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-mirefleurs',
    titre: 'Restaurant Le Mirefleurs',
    slug: 'le-mirefleurs',
    categorie: 'professionnel',
    typeDeBien: 'Restaurant',
    typeDeProjet: 'Décoration',
    commune: 'Bordeaux',
    departement: 'Gironde',
    resume: 'Décoration d’un restaurant bordelais.',
    imagePrincipale: img('ocre', 'Restaurant Le Mirefleurs'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('lin', 'Banquette, Restaurant Le Mirefleurs', 'portrait'), affichage: 'paire'},
      {image: img('chene', 'Salle, Restaurant Le Mirefleurs', 'portrait'), affichage: 'pleine'},
      {image: img('sauge', 'Bar, Restaurant Le Mirefleurs', 'portrait'), affichage: 'pleine'},
      {image: img('creme', 'Luminaires, Restaurant Le Mirefleurs', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Entrée, Restaurant Le Mirefleurs', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Décoration – Restaurant Le Mirefleurs, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-suite-cauderan',
    titre: 'Suite parentale Caudéran',
    slug: 'suite-parentale-cauderan',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Rénovation partielle',
    commune: 'Caudéran',
    departement: 'Gironde',
    resume: 'Une suite parentale créée dans une maison de Caudéran.',
    imagePrincipale: img('lin', 'Suite parentale Caudéran'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Caudéran'),
    galerie: [
      {image: img('creme', 'Chambre, Suite parentale Caudéran', 'portrait'), affichage: 'paire'},
      {image: img('sauge', 'Dressing, Suite parentale Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('chene', 'Salle de bain, Suite parentale Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('ocre', 'Tête de lit, Suite parentale Caudéran', 'portrait'), affichage: 'pleine'},
      {image: img('lin', 'Coin lecture, Suite parentale Caudéran', 'portrait'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Rénovation partielle – Suite parentale Caudéran, par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
]

export const avis: Avis[] = [
  {_id: 'a1', prenom: 'Claire', note: 5, date: '2026-06-12', source: 'Google', texte: 'Avis d’exemple. Les vrais avis Google seront importés au lancement, tels quels, avec le prénom.'},
  {_id: 'a2', prenom: 'Thomas', note: 5, date: '2026-04-03', source: 'Google', texte: 'Avis d’exemple. Une écoute rare, des propositions justes, et une maison qui nous ressemble enfin.'},
  {_id: 'a3', prenom: 'Sophie', note: 5, date: '2026-02-20', source: 'Google', texte: 'Avis d’exemple. La visite en 3D nous a permis de tout voir avant les travaux.'},
  {_id: 'a4', prenom: 'Julien', note: 5, date: '2025-11-08', source: 'Google', texte: 'Avis d’exemple.'},
]

export const pageAccueil: PageAccueil = {
  hero: {
    image: img('chene', 'Pièce de vie lumineuse en chêne clair, projet Studio Jeanne à Bordeaux'),
    h1: 'Studio Jeanne, architecte d’intérieur à Bordeaux',
    accroche: 'Votre intérieur devrait vous ressembler, vraiment.',
    sousTitre: 'J’écoute, je questionne, je traduis.',
    boutonLibelle: 'Parler de votre projet',
  },
  projetsRecents: {
    titre: 'Projets récents',
    texte: 'Rénovation et aménagement intérieur, d’une seule pièce à la maison entière, pour les particuliers comme pour les bars et restaurants, à Bordeaux, en Gironde et sur la côte atlantique.',
    lienLibelle: 'Voir tous les projets',
  },
  deroule: {
    titre: 'Comment se passe un projet',
    texte: paragraphes(
      'Tout commence par une longue conversation. Comment vous vivez, ce qui vous manque, ce que vous n’arrivez pas encore à formuler.',
      'Ensuite je dessine. Plans, planches d’ambiance, modélisation 3D que vous parcourez comme si vous y étiez. Vous voyez votre maison avant les travaux, et nous l’ajustons jusqu’à ce qu’elle soit juste.',
      'Enfin nous choisissons ensemble les matériaux et le mobilier, et je vous mets en relation avec des artisans de confiance.',
    ),
    lienLibelle: 'Le détail de l’accompagnement',
  },
  aiguillage: {
    titre: 'Deux points de départ',
    colonne1: {
      titre: 'Vous avez déjà votre maison.',
      texte: 'Vous venez de l’acheter, ou vous y vivez depuis des années et le moment est enfin venu de la transformer.',
      boutonLibelle: 'L’accompagnement',
    },
    colonne2: {
      titre: 'Vous ne l’avez pas encore trouvée.',
      texte: 'Je cherche votre bien avec vous, en sachant déjà ce que vous voulez en faire.',
      boutonLibelle: 'Trouver votre bien',
    },
  },
  caroline: {
    image: img('lin', 'Portrait de Caroline Canova, architecte d’intérieur à Bordeaux', 'portrait'),
    texte:
      'Je m’appelle Caroline Canova. J’ai commencé par un autre métier, l’orthophonie, où j’ai passé quinze ans à comprendre ce que les gens n’arrivent pas à formuler. C’est resté ma façon de travailler.',
    lienLibelle: 'Mon parcours',
  },
  avis: {titre: 'Ce qu’en disent mes clients', lienLibelle: 'Lire tous les avis'},
  appel: {
    titre: 'La première étape',
    texte:
      'Un formulaire d’une dizaine de minutes, puis un échange d’une heure en visio. Vous recevez ensuite une proposition écrite, et vous prenez le temps qu’il vous faut.',
    boutonLibelle: 'Remplir le formulaire',
  },
  seo: {
    metaTitle: 'Architecte d’intérieur à Bordeaux · Studio Jeanne',
    metaDescription:
      'Caroline Canova, architecte et décoratrice d’intérieur à Bordeaux. Rénovation et conception de maisons de famille, de l’écoute aux finitions.',
  },
}

const appelStandard = {
  titre: 'Parlons de votre projet',
  texte: 'Un formulaire d’une dizaine de minutes, puis un échange d’une heure en visio.',
  boutonLibelle: 'Remplir le formulaire',
}

export const pageProjets: PageProjets = {
  intro: {
    titre: 'Projets d’architecture intérieure à Bordeaux',
    texte: paragraphes('Phrase d’introduction à écrire. Maisons de famille, appartements et résidences secondaires, à Bordeaux et sur la côte atlantique.'),
  },
  blocPro: {
    image: img('ardoise', 'Salle de restaurant aménagée par Studio Jeanne à Bordeaux'),
    titre: 'Commerces et restaurants',
    texte: 'Studio Jeanne accompagne aussi les professionnels qui veulent un lieu à leur image.',
    lienLibelle: 'Voir les projets professionnels',
  },
  seo: {
    metaTitle: 'Projets d’architecture intérieure, Bordeaux et Gironde · Studio Jeanne',
    metaDescription: 'Les réalisations de Studio Jeanne : rénovations de maisons et d’appartements à Bordeaux, Caudéran, Le Bouscat, Mérignac et sur la côte atlantique.',
  },
}

export const pageAccompagnement: PageOffre = {
  aiguillage: {texte: 'Vous n’avez pas encore trouvé votre bien ?', lienLibelle: 'Trouver votre bien'},
  intro: {
    titre: 'Concevoir votre lieu de vie, dans son ensemble',
    texte: paragraphes(
      'Un intérieur réussi ne se décide pas pièce par pièce. La circulation, la lumière, les usages du quotidien se pensent à l’échelle de la maison entière. C’est là que se joue la différence entre un espace rénové et un lieu où l’on se sent bien.',
    ),
  },
  etapes: [
    {
      _key: 'e1',
      titre: 'L’écoute',
      texte: paragraphes('Le projet commence par un temps d’écoute : votre mode de vie, vos habitudes, ce qui fonctionne mal aujourd’hui et que vous n’avez peut-être jamais formulé.'),
      image: img('lin', 'Échange autour des plans d’un projet de rénovation', 'portrait'),
    },
    {
      _key: 'e2',
      titre: 'La conception',
      texte: paragraphes(
        'Vient ensuite la conception. Plans d’aménagement, planches d’ambiance, modélisation 3D et visite immersive de votre futur intérieur. Vous voyez votre maison avant qu’elle n’existe, et nous l’ajustons jusqu’à ce que vous vous y reconnaissiez.',
      ),
      image: img('creme', 'Planche d’ambiance et échantillons de matériaux', 'portrait'),
    },
    {
      _key: 'e3',
      titre: 'Les plans, les matériaux, les artisans',
      texte: paragraphes(
        'Puis les plans techniques, la sélection des matériaux et du mobilier, l’accompagnement en showroom. Je vous mets en relation avec des artisans de confiance et je les réunis sur place pour leur présenter le projet avant le démarrage des travaux.',
      ),
      image: img('chene', 'Cuisine en chêne terminée, projet Studio Jeanne', 'portrait'),
    },
  ],
  texteA: {
    texte: paragraphes(
      'Je ne fais pas de suivi de chantier, c’est un choix. Conduire un chantier est un métier à part entière, et je préfère vous orienter vers des maîtres d’œuvre partenaires plutôt que de le faire à moitié. Une visite en cours de chantier est incluse pour vérifier la bonne exécution des choix décoratifs.',
    ),
  },
  texteB: {
    titre: 'Les commandes',
    texte: paragraphes(
      'Pour les commandes, je peux prendre en charge l’achat et la logistique auprès de mes fournisseurs. Vous bénéficiez de mes tarifs professionnels et vous n’avez rien à gérer.',
    ),
  },
  faq: [
    {_key: 'f1', question: 'Question d’exemple : intervenez-vous en dehors de Bordeaux ?', reponse: 'Réponse à écrire. Oui, en Gironde et sur la côte atlantique.'},
    {_key: 'f2', question: 'Question d’exemple : faut-il avoir déjà acheté son bien ?', reponse: 'Réponse à écrire.'},
    {_key: 'f3', question: 'Question d’exemple : combien de temps dure la conception ?', reponse: 'Réponse à écrire.'},
  ],
  appel: appelStandard,
  seo: {
    metaTitle: 'Rénovation et architecture intérieure à Bordeaux · Studio Jeanne',
    metaDescription: 'Écoute, plans, 3D, matériaux, artisans : comment Studio Jeanne conçoit la rénovation de votre maison à Bordeaux, dans son ensemble.',
  },
}

export const pageTrouverVotreBien: PageOffre = {
  aiguillage: {texte: 'Vous avez déjà votre maison ?', lienLibelle: 'L’accompagnement'},
  intro: {
    titre: 'Trouver le bien, puis en faire votre maison',
    texte: paragraphes('Vous avez un projet en tête mais pas encore le lieu pour l’accueillir. Chercher un bien, c’est déjà commencer à le dessiner.'),
  },
  etapes: [
    {
      _key: 'e1',
      titre: 'Voir ce qu’un bien peut devenir',
      texte: paragraphes(
        'Une maison mal distribuée, des volumes qu’on n’arrive pas à imaginer autrement, une pièce dont personne ne voit l’usage : la plupart des acheteurs passent à côté de biens qui pouvaient tout à fait devenir ce qu’ils cherchaient. Studio Jeanne est né comme ça, dans une échoppe dont personne ne voulait.',
      ),
      image: img('creme', 'Façade d’une échoppe bordelaise', 'portrait'),
    },
    {
      _key: 'e2',
      titre: 'Une double compétence',
      texte: paragraphes(
        'Je suis chasseuse en immobilier au sein de l’agence Homelike Home, et architecte d’intérieur chez Studio Jeanne. Je cherche votre bien en sachant déjà ce que vous voulez en faire, et je le visite en voyant ce qu’il peut devenir.',
      ),
      image: img('lin', 'Visite d’un bien à rénover à Bordeaux', 'portrait'),
    },
    {
      _key: 'e3',
      titre: 'Savoir avant de signer',
      texte: paragraphes(
        'Le regard fonctionne dans les deux sens. Un coup de cœur peut cacher des remontées d’humidité, un règlement de copropriété qui bloquera vos travaux, une distribution qu’aucun budget ne rendra confortable. Autant le savoir avant de signer.',
        'Vous n’achetez pas un bien en espérant qu’il conviendra. Vous l’achetez en sachant ce qu’il deviendra.',
      ),
      image: img('ardoise', 'Plans d’un bien avant achat', 'portrait'),
    },
  ],
  texteA: {
    titre: 'Après l’achat',
    texte: paragraphes(
      'Une fois le bien acquis, le projet se poursuit exactement comme les autres : écoute, conception, plans, modélisation 3D, sélection des matériaux et du mobilier. Sans reprendre à zéro, puisque nous avons commencé à y réfléchir ensemble avant même l’achat.',
    ),
  },
  texteB: {
    titre: 'Deux structures, un seul interlocuteur',
    texte: paragraphes(
      'La recherche est facturée par Homelike Home, la conception par Studio Jeanne. Deux structures, deux factures, un seul interlocuteur du premier bien visité aux dernières finitions.',
    ),
  },
  faq: [
    {_key: 'f1', question: 'Question d’exemple : comment se passe la recherche ?', reponse: 'Réponse à écrire.'},
    {_key: 'f2', question: 'Question d’exemple : dans quels quartiers cherchez-vous ?', reponse: 'Réponse à écrire.'},
    {_key: 'f3', question: 'Question d’exemple : peut-on faire seulement la recherche ?', reponse: 'Réponse à écrire.'},
  ],
  appel: appelStandard,
  lienHomelikeLibelle: 'Découvrir l’agence Homelike Home',
  seo: {
    metaTitle: 'Chasseur immobilier et architecte d’intérieur à Bordeaux · Studio Jeanne',
    metaDescription: 'Chasseuse en immobilier et architecte d’intérieur à Bordeaux : Caroline Canova cherche votre bien en sachant déjà ce que vous voulez en faire.',
  },
}

export const pageAPropos: PageAPropos = {
  titre: 'Studio Jeanne, c’est une histoire bordelaise.',
  texte: paragraphes(
    'Celle d’une échoppe rue Jeanne dont personne ne voulait et dont j’ai été la seule à voir le potentiel. En la transformant de fond en comble, en faisant naître un intérieur chaleureux et singulier, j’ai compris que c’était ça, mon métier.',
    'Avant de concevoir des espaces, j’ai passé quinze ans à écouter. Orthophoniste, j’ai appris à comprendre ce que les gens ne parviennent pas à formuler. C’est exactement ce que je fais aujourd’hui avec les lieux de vie.',
    'Depuis 2021, j’accompagne des familles qui veulent transformer leur maison en profondeur, à Bordeaux comme au bord de l’océan. Chaque projet commence par une écoute attentive de votre mode de vie, et se construit étape par étape jusqu’à un intérieur qui vous ressemble.',
  ),
  portrait: img('lin', 'Portrait de Caroline Canova, architecte d’intérieur à Bordeaux', 'portrait'),
  imageEchoppe: img('creme', 'L’échoppe de la rue Jeanne à Bordeaux après rénovation'),
  lienAvisLibelle: 'Ce qu’en disent mes clients',
  appel: appelStandard,
  seo: {
    metaTitle: 'Caroline Canova, architecte d’intérieur à Bordeaux · Studio Jeanne',
    metaDescription: 'Caroline Canova a fondé Studio Jeanne à Bordeaux en 2021, après quinze ans d’orthophonie. Son parcours et sa façon de travailler.',
  },
}

export const pageContact: PageContact = {
  intro: {
    titre: 'Parlons de votre projet',
    texte: paragraphes(
      'Avant de nous rencontrer, j’ai besoin de comprendre où vous en êtes. Le formulaire ci-dessous prend une dizaine de minutes : votre lieu, quelques photos, ce que vous avez en tête. Si vous n’avez pas encore trouvé votre bien, dites-le moi dès la première question, le point de départ n’est alors pas le même.',
      'Ce n’est pas une formalité. C’est ce qui me permet d’arriver à notre échange en ayant déjà regardé vos pièces, repéré les contraintes et réfléchi aux possibilités. Vous ne passerez pas votre premier rendez-vous à tout m’expliquer.',
      'Une fois le formulaire envoyé, vous choisissez directement un créneau dans mon agenda. Nous échangeons en visio, une heure environ. Vous me racontez comment vous vivez, ce qui fonctionne mal, ce dont vous rêvez. Je vous dis ce qui me semble possible, comment je travaillerais, et dans quel ordre de budget nous nous situons.',
      'Vous recevez ensuite une proposition écrite reprenant tout ce que nous avons évoqué. Vous prenez le temps qu’il vous faut pour décider.',
    ),
  },
  boutonLibelle: 'Remplir le formulaire',
  coordonnees: 'Vous pouvez aussi m’appeler ou m’écrire.',
  zone: {
    titre: 'Où j’interviens',
    texte: paragraphes(
      'Bordeaux, Caudéran, Le Bouscat, Mérignac, la Gironde et la côte atlantique. Je me déplace chez vous une fois le projet lancé, pour la prise de côtes.',
    ),
  },
  seo: {
    metaTitle: 'Contact · Architecte d’intérieur à Bordeaux et en Gironde',
    metaDescription: 'Parlons de votre projet : un formulaire d’une dizaine de minutes, puis un échange d’une heure en visio. Studio Jeanne, Bordeaux et Gironde.',
  },
}

export const pageProfessionnels: PageSimple = {
  intro: {
    titre: 'Aménagement de commerces et restaurants à Bordeaux',
    texte: paragraphes('Texte à écrire. Studio Jeanne conçoit aussi des lieux pour les professionnels : restaurants, bars, boutiques.'),
  },
  appel: {...appelStandard, titre: 'Un lieu à aménager ?'},
  seo: {
    metaTitle: 'Aménagement de commerces et restaurants à Bordeaux · Studio Jeanne',
    metaDescription: 'Studio Jeanne aménage commerces et restaurants à Bordeaux : Le Replay, Le Mirefleurs, Boutik Optik.',
  },
}

export const pageAvisClients: PageSimple = {
  intro: {titre: 'Ce qu’en disent mes clients'},
  appel: appelStandard,
  seo: {
    metaTitle: 'Avis clients · Studio Jeanne, architecte d’intérieur à Bordeaux',
    metaDescription: 'Les avis des clients de Studio Jeanne, architecte d’intérieur à Bordeaux, tels qu’ils les ont laissés sur Google.',
  },
}

const legale = (titre: string): PageLegale => ({
  titre,
  texte: paragraphes('Texte à écrire.'),
  seo: {metaDescription: `${titre} du site Studio Jeanne.`},
})

export const pagesLegales = {
  'mentions-legales': legale('Mentions légales'),
  'politique-de-confidentialite': legale('Politique de confidentialité'),
  cgv: legale('Conditions générales de vente'),
}
