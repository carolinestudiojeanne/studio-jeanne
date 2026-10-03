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
  {
    _id: 'exemple-ornano',
    titre: 'Maison Ornano',
    slug: 'maison-ornano',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Rénovation complète',
    commune: 'Mérignac',
    departement: 'Gironde',
    porteDEntree: 'achat-recent',
    annee: 2025,
    surface: 160,
    resume: 'Une maison des années trente entièrement repensée pour une famille de cinq, autour d’une grande pièce de vie.',
    imagePrincipale: img('chene', 'Pièce de vie en chêne clair ouverte sur le jardin, maison Ornano à Mérignac'),
    contexte: paragraphes('Texte d’exemple. Une maison des années trente achetée par une famille de cinq, cloisonnée et sombre au rez-de-chaussée.'),
    demande: paragraphes('Texte d’exemple. Une grande pièce de vie tournée vers le jardin, des rangements partout, et une chambre parentale au calme.'),
    realisation: texteRealisation('Mérignac'),
    galerie: [
      {image: img('chene', 'Cuisine en chêne clair et plan de travail en pierre, maison Ornano à Mérignac'), affichage: 'pleine'},
      {image: img('creme', 'Arche entre l’entrée et le séjour, maison Ornano', 'portrait'), affichage: 'paire'},
      {image: img('lin', 'Salle de bain en terre cuite et lin, maison Ornano', 'portrait'), affichage: 'paire'},
      {image: img('ocre', 'Séjour et bibliothèque sur mesure, maison Ornano à Mérignac'), affichage: 'pleine'},
    ],
    avantApres: [
      {
        avant: img('ardoise', 'Le séjour avant les travaux, cloisonné et sombre'),
        apres: img('chene', 'Le séjour après les travaux, ouvert sur le jardin'),
        legende: 'Le séjour, ouvert sur la cuisine',
      },
    ],
    retourClient: {citation: 'Avis d’exemple. Caroline a compris ce que nous voulions avant que nous sachions le dire.', prenom: 'Claire'},
    seo: {metaDescription: 'Rénovation complète d’une maison des années trente à Mérignac par Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'exemple-kennedy',
    titre: 'Maison Kennedy',
    slug: 'maison-kennedy',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Rénovation partielle',
    commune: 'Le Bouscat',
    departement: 'Gironde',
    resume: 'Cuisine, entrée et suite parentale réinventées dans une maison familiale du Bouscat.',
    imagePrincipale: img('creme', 'Cuisine crème et bois, maison Kennedy au Bouscat'),
    contexte: paragraphes('Texte d’exemple.'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Le Bouscat'),
    galerie: [
      {image: img('creme', 'Cuisine, maison Kennedy au Bouscat'), affichage: 'pleine'},
      {image: img('lin', 'Suite parentale, maison Kennedy', 'portrait'), affichage: 'paire'},
      {image: img('sauge', 'Entrée, maison Kennedy', 'portrait'), affichage: 'paire'},
    ],
    seo: {metaDescription: 'Rénovation d’une maison familiale au Bouscat : cuisine, entrée et suite parentale, par Studio Jeanne.'},
  },
  {
    _id: 'exemple-fenelon',
    titre: 'Appartement Fenelon',
    slug: 'appartement-fenelon',
    categorie: 'residentiel',
    typeDeBien: 'Appartement',
    typeDeProjet: 'Rénovation complète',
    commune: 'Bordeaux',
    departement: 'Gironde',
    porteDEntree: 'avant-achat',
    resume: 'Un appartement bordelais trouvé puis transformé, du premier bien visité aux dernières finitions.',
    imagePrincipale: img('lin', 'Séjour lumineux et parquet ancien, appartement Fenelon à Bordeaux'),
    contexte: paragraphes('Texte d’exemple.'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('lin', 'Séjour, appartement Fenelon à Bordeaux'), affichage: 'pleine'},
      {image: img('chene', 'Cuisine, appartement Fenelon'), affichage: 'pleine'},
      {image: img('creme', 'Chambre, appartement Fenelon'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Recherche et rénovation complète d’un appartement à Bordeaux par Studio Jeanne, architecte d’intérieur.'},
  },
  {
    _id: 'exemple-soulac',
    titre: 'Maison Soulac',
    slug: 'maison-soulac',
    categorie: 'residentiel',
    typeDeBien: 'Maison de vacances',
    typeDeProjet: 'Aménagement',
    commune: 'Soulac-sur-Mer',
    departement: 'Gironde',
    resume: 'Une maison de vacances près de l’océan, pensée pour accueillir toute la famille.',
    imagePrincipale: img('sauge', 'Salon d’une maison de vacances à Soulac-sur-Mer'),
    contexte: paragraphes('Texte d’exemple.'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Soulac-sur-Mer'),
    galerie: [
      {image: img('sauge', 'Salon, maison Soulac'), affichage: 'pleine'},
      {image: img('ocre', 'Chambre d’enfants, maison Soulac', 'portrait'), affichage: 'paire'},
      {image: img('lin', 'Salle d’eau, maison Soulac', 'portrait'), affichage: 'paire'},
    ],
    seo: {metaDescription: 'Aménagement d’une maison de vacances à Soulac-sur-Mer par Studio Jeanne, architecte d’intérieur.'},
  },
  {
    _id: 'exemple-replay',
    titre: 'Le Replay',
    slug: 'le-replay',
    categorie: 'professionnel',
    typeDeBien: 'Restaurant',
    typeDeProjet: 'Aménagement',
    commune: 'Bordeaux',
    departement: 'Gironde',
    resume: 'Aménagement d’un bar-restaurant à Bordeaux.',
    imagePrincipale: img('ardoise', 'Salle du bar-restaurant Le Replay à Bordeaux'),
    contexte: paragraphes('Texte d’exemple.'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('ardoise', 'Bar, Le Replay'), affichage: 'pleine'},
      {image: img('ocre', 'Salle, Le Replay'), affichage: 'pleine'},
      {image: img('creme', 'Terrasse, Le Replay'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Aménagement du bar-restaurant Le Replay à Bordeaux par Studio Jeanne.'},
  },
  {
    _id: 'exemple-mirefleurs',
    titre: 'Le Mirefleurs',
    slug: 'le-mirefleurs',
    categorie: 'professionnel',
    typeDeBien: 'Restaurant',
    typeDeProjet: 'Décoration',
    commune: 'Bordeaux',
    departement: 'Gironde',
    resume: 'Décoration d’un restaurant bordelais.',
    imagePrincipale: img('ocre', 'Salle du restaurant Le Mirefleurs à Bordeaux'),
    contexte: paragraphes('Texte d’exemple.'),
    demande: paragraphes('Texte d’exemple.'),
    realisation: texteRealisation('Bordeaux'),
    galerie: [
      {image: img('ocre', 'Salle, Le Mirefleurs'), affichage: 'pleine'},
      {image: img('lin', 'Banquette, Le Mirefleurs'), affichage: 'pleine'},
      {image: img('chene', 'Bar, Le Mirefleurs'), affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Décoration du restaurant Le Mirefleurs à Bordeaux par Studio Jeanne.'},
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
