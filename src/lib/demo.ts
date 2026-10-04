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

export const projets: Projet[] = [
  // Les 8 projets du site actuel (studio-jeanne.com/realisation/…) : textes de Caroline et photos d'origine.
  {
    _id: 'projet-la-rochelle',
    titre: 'Appartement La Rochelle',
    slug: 'appartement-la-rochelle',
    categorie: 'residentiel',
    typeDeBien: 'Appartement',
    typeDeProjet: 'Architecture d’intérieur et décoration',
    commune: 'La Rochelle',
    departement: 'Charente-Maritime',
    surface: 110,
    resume: 'Un appartement avec vue mer, resté dans les années 80, rendu actuel et fonctionnel.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bffc8dd3d4ff96287486a_20220728_153307-p-1600.jpg', width: 1600, height: 2133, alt: 'Appartement La Rochelle'},
    demande: paragraphes('Cet appartement avec une vue mer était resté bloqué dans les années 80. Nouveaux propriétaires, mes clients m’ont sollicitée pour rendre cet appartement au goût du jour et plus fonctionnel.'),
    realisation: paragraphes('J’ai donc revu le plan pour agrandir la cuisine, modifié les circulations pour gagner en rangement et en clarté. Le grand séjour a été séparé en plusieurs espaces grâce à ce meuble cloison/bibliothèque : derrière se cache le salon « télé », devant un petit coin lecture face à la vue, un plus grand salon pour recevoir et une salle à manger avec sa banquette et son grand vaisselier.', 'Côté chambres, la suite parentale est chic et chaleureuse avec ses dégradés de terracotta et de rose avec des touches de laiton que l’on retrouve dans tout l’appartement. Pour la chambre des petits-enfants, un bleu plus bord de mer et une salle d’eau graphique en total look !'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/643e44a339259bfe2e554464_633bfec5f38757484fce5cd5_20220728_153229-p-2600.jpeg', width: 1950, height: 2600, alt: 'Appartement La Rochelle, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c02ea5ad0b364dadd8fef_20220728_151613-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bfec5f3035b960cd639f2_20220728_152719-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bfeac3961ad42bb7e1a01_20220728_151824-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bfeac3d90568831a872a8_20220728_152232-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff2ff065446c79c095aa_20220728_172311-p-1600.jpg', width: 500, height: 500, alt: 'Appartement La Rochelle, photo 6'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff2fabd0437d187c1bea_20220728_172717-p-1600.jpg', width: 500, height: 500, alt: 'Appartement La Rochelle, photo 7'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff2fabd043dc197c1be9_20220728_154323-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 8'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bfed98a121ff8e4491ddf_20220728_153818-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 9'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff2f43039ab86d52709c_20220728_155316-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 10'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bfe89218c5be106ffa124_20220728_150722-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 11'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff30154905fd27481fcf_20220728_171146-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 12'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c01f37b6b357132ae0458_IMG_20220417_130327-p-1600.jpg', width: 500, height: 500, alt: 'Appartement La Rochelle, photo 13'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c02040de2a338b9fb80f7_IMG_20220417_131639-p-1600.jpg', width: 500, height: 500, alt: 'Appartement La Rochelle, photo 14'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/643e44a3c25f4281da0dc8b2_633bff2f682bc89fdffd52ee_20220728_171706-p-2600.jpeg', width: 1950, height: 2600, alt: 'Appartement La Rochelle, photo 15'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/643e44a20c67544ca0c7550a_633bff30682bc8ea8afd52ef_20220728_171530-p-2600.jpeg', width: 1950, height: 2600, alt: 'Appartement La Rochelle, photo 16'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff30f06544b9d2c095d8_20220728_173009-p-1600.jpg', width: 500, height: 375, alt: 'Appartement La Rochelle, photo 17'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633bff30abd04305fa7c1beb_20220728_175850-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 18'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/643e44a37bf2fe7ca2d6c1a9_633c00c6f4a3353a417c4bd4_20220728_170954-p-2600.jpeg', width: 1950, height: 2600, alt: 'Appartement La Rochelle, photo 19'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/643e44a3e5cb551df08345c0_633bfe96f9aa6fd443f979b2_20220728_145828-p-2600.jpeg', width: 1950, height: 2600, alt: 'Appartement La Rochelle, photo 20'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c0373b0cae7dbef2bcb4e_IMG_20210306_120530-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 21'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c0373dd3d4f0c6d8a0109_IMG_20210414_183153-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 22'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c03737b6b351435aec509_IMG_20210414_183226-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 23'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/633c0373b0cae7636f2bcb35_IMG_20210417_125904-p-1600.jpg', width: 500, height: 667, alt: 'Appartement La Rochelle, photo 24'}, affichage: 'paire'},
    ],
    seo: {metaDescription: 'Appartement La Rochelle : un appartement avec vue mer, resté dans les années 80, rendu actuel et fonctionnel. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-replay',
    titre: 'Bar-restaurant Le Replay',
    slug: 'le-replay',
    categorie: 'professionnel',
    typeDeBien: 'Bar-restaurant',
    typeDeProjet: 'Implantation d’un bar',
    commune: 'La Teste-de-Buch',
    departement: 'Gironde',
    resume: 'Un très grand bar intégré au cœur d’un restaurant du bassin d’Arcachon.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085ae1ffeb9e66f5556921_Le-replay-9-studio-jeanne-p-1600.jpg', width: 1600, height: 1067, alt: 'Bar-restaurant Le Replay'},
    demande: paragraphes('Les propriétaires du bar « Le Replay » situé sur le bassin d’Arcachon m’ont contactée pour les aider à intégrer un très grand bar au milieu de leur établissement. Le but était donc d’intégrer un bar avec différentes fonctions : bar à cocktails pour danser autour, table de mixage pour le DJ, caisse pour le restaurant, distribution des sets de billard et toute la partie technique qui va avec !'),
    realisation: paragraphes('Il m’a fallu intégrer ce nouveau bar à la décoration existante : j’ai donc proposé différents types de carrelage (notamment en chevrons pour reprendre le motif du sol), et des tasseaux de bois pour apporter de la chaleur et reprendre le logo de l’établissement en motif central.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0d1993d43774da7cfe_Le-replay-3-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0ee0e945202f7b42f4_Le-replay-2-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0d0fe582f2466bf102_Le-replay-4-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0e1993d43774da7da6_Le-replay-6-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0e3b547478d9569a07_Le-replay-7-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65085b0e9cbb07610ecc0d91_Le-replay-8-studio-jeanne-p-1600.jpg', width: 500, height: 333, alt: 'Bar-restaurant Le Replay, photo 6'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Bar-restaurant Le Replay : un très grand bar intégré au cœur d’un restaurant du bassin d’Arcachon. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-cuisine-bouscat',
    titre: 'Cuisine Le Bouscat',
    slug: 'cuisine-le-bouscat',
    categorie: 'residentiel',
    typeDeBien: 'Maison neuve',
    typeDeProjet: 'Conception d’une cuisine',
    commune: 'Le Bouscat',
    departement: 'Gironde',
    resume: 'Une très grande cuisine ouverte sur le séjour, pensée pour une famille nombreuse.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63ae10ad2e6851a74e6b4_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%207-p-1600.jpg', width: 1600, height: 1067, alt: 'Cuisine Le Bouscat'},
    demande: paragraphes('Mes clients m’ont contactée pour les aider à concevoir cette très grande cuisine pour la maison qu’ils ont fait construire.'),
    realisation: paragraphes('En leur proposant des visuels 3D, je les ai aidés à choisir le meilleur aménagement pour cette cuisine conçue pour une famille nombreuse, tout en intégrant\nla partie salon et salle à manger. Je les ai également mis en relation avec un cuisiniste pour la réalisation de ce beau projet.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7a8aedd53e8ebd3625_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%202-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7a8691576eea70f813_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%201-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, vue d’ensemble'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7bd7b5a8671ac235a0_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%203-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, photo 3'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7afed90d9e28a3a0e0_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%204-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, photo 4'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7a12d285701a32c8a0_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%205-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, photo 5'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/67a63b7ac0f1f0f72b8eb702_STUDIO%20JEANNE%20CUISINE%20LE%20BOUSCAT%206-p-1600.jpg', width: 500, height: 750, alt: 'Cuisine Le Bouscat, photo 6'}, affichage: 'paire'},
    ],
    seo: {metaDescription: 'Cuisine Le Bouscat : une très grande cuisine ouverte sur le séjour, pensée pour une famille nombreuse. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-echoppe-merignac',
    titre: 'Échoppe double Mérignac',
    slug: 'echoppe-double-merignac',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Aménagement et décoration',
    commune: 'Mérignac',
    departement: 'Gironde',
    surface: 150,
    resume: 'Toute la décoration et le mobilier d’une maison, pour une nouvelle vie bordelaise.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed752dde647689a618a_Veuve%20Crocq%20studio%20jeanne%2015-p-1600.jpg', width: 1600, height: 1067, alt: 'Échoppe double Mérignac'},
    demande: paragraphes('Mes clients ont acheté cette maison pour leur nouvelle vie bordelaise. Ils ont vendu leur appartement parisien avec tous leurs meubles. Aussi, ils m’ont contactée pour les aider à décorer et sélectionner tout le mobilier, luminaires, éléments de décoration… de leur nouvelle maison.', 'Ils m’ont également demandé de dessiner du mobilier sur mesure pour créer un dressing dans l’entrée, des placards dans l’espace de jeux, et des rangements supplémentaires dans le salon, avec une banquette dans laquelle est intégré leur rétroprojecteur.'),
    realisation: paragraphes('Même si la maison était récente, ils ont souhaité apporter une décoration plus contemporaine, avec des choix audacieux, comme le papier peint graphique de l’entrée et la décoration de l’insert de la cheminée avec des carreaux nacrés.', 'J’ai travaillé ces aménagements en partant de ceux existants, en créant une continuité grâce au papier peint et aux étagères arrondies que l’on retrouve aux différents angles.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed564b3f775f4d2aecd_Veuve%20Crocq%20studio%20jeanne%201-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed1540beae4788685a6_thumbnail_Caro-modif-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed278ed43216904c334_Veuve%20Crocq%20studio%20jeanne%202-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed51cf2ddf16c5d7f7a_Veuve%20Crocq%20studio%20jeanne%204-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed272ad6e8f236d3502_Veuve%20Crocq%20studio%20jeanne%205-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed1cc8ed6535ab33adb_Veuve%20Crocq%20studio%20jeanne%206-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 6'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed6311df65de46a2bcd_Veuve%20Crocq%20studio%20jeanne%207-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 7'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed7540beae478869143_Veuve%20Crocq%20studio%20jeanne%208-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 8'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e90f9f85565ee6de1086e_Veuve%20Crocq%20studio%20jeanne%209-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 9'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed24b8a0498fbc3942f_Veuve%20Crocq%20studio%20jeanne%2010-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 10'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed4311df65de46a27b8_Veuve%20Crocq%20studio%20jeanne%2011-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 11'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e90fb1fdaad5a2af1690e_Veuve%20Crocq%20studio%20jeanne%2012-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 12'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed42e198303b0731cfb_Veuve%20Crocq%20studio%20jeanne%2013-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 13'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8e0e614b79346e7f677e_Veuve%20Crocq%20studio%20jeanne%2014-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 14'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed75ca7c515a8f7d9f6_Veuve%20Crocq%20studio%20jeanne%2017-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 16'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed12ce1739cfe822f93_Veuve%20Crocq%20studio%20jeanne%2018-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 17'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed6540beae47886900c_Veuve%20Crocq%20studio%20jeanne%2019-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 18'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e90f83484a88e08a1b33d_Veuve%20Crocq%20studio%20jeanne%2020-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 19'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e90f8bee2b282c02f9495_Veuve%20Crocq%20studio%20jeanne%2021-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 20'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e90fc2e284c11e411b492_Veuve%20Crocq%20studio%20jeanne%2022-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 21'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed15ca7c515a8f7cf49_Veuve%20Crocq%20studio%20jeanne%2024-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 22'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/661e8ed70376cde610809dc8_Veuve%20Crocq%20studio%20jeanne%2026-p-1600.jpg', width: 500, height: 333, alt: 'Échoppe double Mérignac, photo 23'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Échoppe double Mérignac : toute la décoration et le mobilier d’une maison, pour une nouvelle vie bordelaise. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-etage-echoppe-bordeaux',
    titre: 'Étage échoppe double Bordeaux',
    slug: 'etage-echoppe-double-bordeaux',
    categorie: 'residentiel',
    typeDeBien: 'Échoppe double',
    typeDeProjet: 'Décoration et aménagements sur mesure',
    commune: 'Bordeaux',
    departement: 'Gironde',
    surface: 120,
    resume: 'L’étage d’une échoppe double achetée « dans son jus », près du centre de Bordeaux.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508638b4abf91d96d5e2f0a_Projet-patay-studio-jeanne-26-p-1600.jpg', width: 1600, height: 1067, alt: 'Étage échoppe double Bordeaux'},
    demande: paragraphes('Mes clients ont acheté « dans son jus » cette échoppe double proche du centre-ville de Bordeaux. Ils ont fait appel à une architecte pour rénover dans un premier temps tout l’étage de cette échoppe. Ils m’ont ensuite contactée pour la décoration intérieure et les aménagements sur mesure à intégrer aux plans dessinés par l’architecte.'),
    realisation: paragraphes('Cet étage se compose d’un grand bureau, de deux chambres d’amis avec chacune leur salle d’eau et enfin d’une suite parentale constituée d’une salle de sport, d’une chambre avec accès sur le dressing et la salle de bain de Madame d’un côté et le dressing et la salle d’eau de Monsieur de l’autre.', 'L’idée était d’assurer une continuité dans toutes les pièces : on retrouve des verrières entre chaque chambre et salles de bain, des têtes de lit colorées, du mobilier sur mesure avec des touches de noyer. Je leur ai proposé des visuels 3D afin de se projeter dans leur future décoration, fourni toute la liste du mobilier, luminaires, décoration à intégrer et dessiné les plans du mobilier sur mesure.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508643260d476ed4febf8d2_Projet-patay-studio-jeanne-6-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/650864323d37bb95f8b78cfe_Projet-patay-studio-jeanne-2-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65086430ecd968cdf2acc688_Projet-patay-studio-jeanne-7-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/65086430392bbfd916ee417f_Projet-patay-studio-jeanne-10-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/650864320e8322865a1f4b99_Projet-patay-studio-jeanne-11-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f0e8322865a1f4aa0_Projet-patay-studio-jeanne-12-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 6'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642fecd968cdf2acc635_Projet-patay-studio-jeanne-13-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 7'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f392bbfd916ee412c_Projet-patay-studio-jeanne-17-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 8'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f392bbfd916ee40d9_Projet-patay-studio-jeanne-19-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 9'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642fecd968cdf2acc58c_Projet-patay-studio-jeanne-23-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 10'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f3b547478d95fcf16_Projet-patay-studio-jeanne-24-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 11'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f3b547478d95fcf26_Projet-patay-studio-jeanne-25-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 12'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6508642f511db7320d816096_Projet-patay-studio-jeanne-27-p-1600.jpg', width: 500, height: 333, alt: 'Étage échoppe double Bordeaux, photo 13'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Étage échoppe double Bordeaux : l’étage d’une échoppe double achetée « dans son jus », près du centre de Bordeaux. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-rdc-cauderan',
    titre: 'RDC d’une maison Caudéran',
    slug: 'rdc-maison-cauderan',
    categorie: 'residentiel',
    typeDeBien: 'Maison',
    typeDeProjet: 'Décoration et meubles sur mesure',
    commune: 'Caudéran',
    departement: 'Gironde',
    surface: 80,
    resume: 'Des meubles multifonctions sur mesure pour l’entrée, le séjour et une chambre d’enfant.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1800fa94051fee254ff_Studio%20Jeanne%20Projet%20Fabelle%203%20ok-p-1600.jpg', width: 1600, height: 1067, alt: 'RDC d’une maison Caudéran'},
    demande: paragraphes('Mes clients m’ont contactée pour les aider avec les problématiques suivantes : manque de rangements dans l’entrée, besoin d’un coin bureau, mieux définir leur espace salon et besoin d’un aménagement à moindre coût pour la chambre de leur fille.'),
    realisation: paragraphes('Je leur ai donc dessiné plusieurs meubles multifonctions : côté séjour, j’ai créé un meuble qui fait la jonction entre le coin télé et le poteau derrière le poêle. Côté salon, ils peuvent y mettre la télé et de la déco, on y trouve des rangements bas. Côté escalier, il y a un placard pour les manteaux. Le tout reste ouvert par un jeu d’étagères et d’arrondis pour garder la circulation de la lumière et la perspective.', 'Côté entrée, un banc arrondi permet de ranger les chaussures, des tasseaux permettent à la chaleur du radiateur de passer, le tout se poursuit par un bureau d’appoint qui donne ensuite sur des rangements fermés pour cacher notamment le compteur électrique. Le rideau du placard existant a été remplacé par des portes qui dessinent une arche.', 'Enfin, dans la chambre de leur fille, j’ai créé une alcôve pour mettre le lit et des rangements faits à partir de caissons de la grande distribution. Un joli papier peint fleuri donne de la personnalité et de la perspective à la pièce.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b192e634d9ddd4c175e8_Studio%20Jeanne%20Projet%20Fabelle%204%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b0bc4d74e09d4c64a02a_Studio%20Jeanne%20Projet%20Fabelle%202%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b193890297fc15512a7b_Studio%20Jeanne%20projet%20fabelle%205%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1930b9b7d68cb5e5c2a_Studio%20Jeanne%20Projet%20Fabelle%206%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1930b9b7d68cb5e5c1a_Studio%20Jeanne%20Projet%20Fabelle%207%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b192e634d9ddd4c175f8_Studio%20Jeanne%20Projet%20Fabelle%208%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 6'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1927e9779a77a602630_Studio%20Jeanne%20projet%20fabelle%209%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 7'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1927e9779a77a602640_Studio%20Jeanne%20Projet%20fabelle%2010%20ok-p-1600.jpg', width: 500, height: 333, alt: 'RDC d’une maison Caudéran, photo 8'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1eeea6ea06d6dec5602_Capture%20d%27%C3%A9cran%202023-06-20%20152041.png', width: 835, height: 832, alt: 'RDC d’une maison Caudéran, photo 9'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/6491b1ed3939ec70562dbe8a_Capture%20d%27%C3%A9cran%202023-06-20%20152250.png', width: 852, height: 841, alt: 'RDC d’une maison Caudéran, photo 10'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'RDC d’une maison Caudéran : des meubles multifonctions sur mesure pour l’entrée, le séjour et une chambre d’enfant. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-mirefleurs',
    titre: 'Restaurant Le Mirefleurs',
    slug: 'le-mirefleurs',
    categorie: 'professionnel',
    typeDeBien: 'Restaurant',
    typeDeProjet: 'Nouvelle identité et décoration',
    commune: 'Yvrac',
    departement: 'Gironde',
    surface: 100,
    resume: 'Une nouvelle identité « steakhouse américain » pour un restaurant près de Bordeaux.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a666c90af3ab63f24c514_20240424_102524-p-1600.jpg', width: 1600, height: 901, alt: 'Restaurant Le Mirefleurs'},
    demande: paragraphes('Les propriétaires du restaurant Le Mirefleurs, à quelques kilomètres de Bordeaux, m’ont contactée pour les aider à donner une nouvelle identité à leur restaurant. Ils rêvaient d’une ambiance « steakhouse américain ». Côté mobilier, ils souhaitaient garder les tables et chaises existantes. En revanche, ils souhaitaient isoler du froid les accès vers l’extérieur.'),
    realisation: paragraphes('Je leur ai donc proposé un grand meuble sur mesure dans l’entrée avec des rangements coulissants et un claustra géométrique qui laisse passer la lumière tout en isolant l’entrée visuellement. Côté terrasse, des étagères métalliques ont été utilisées pour créer un couloir qui permet d’accueillir de la décoration.', 'Au niveau des murs, les plus grands ont été recouverts de papier peint style atelier new-yorkais pour donner du caractère, et les autres peints en noir, comme la jolie charpente et le bar. Celui-ci a également été recouvert de moulures et de jolies plinthes pour lui donner du cachet.', 'Enfin, un travail sur les luminaires a été proposé : ils définissent les différents espaces. Quelques banquettes capitonnées ont été ajoutées pour le côté cosy. Vous trouverez quelques photos du « avant » pour voir la différence.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667df57e980162de2937_20240424_102850-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667b53e23f12910c3d39_20240424_102536-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, vue d’ensemble'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667bd6386efbc0b4b60a_20240424_103241-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 3'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667cdfca202b53458deb_20240424_103436-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 4'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667db9c8227d54c0e269_20240424_103852-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 5'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667b34ee55f1bb3a3f0b_20240424_104353-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 6'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a667b67c68563bc94b20f_20240424_104801-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, photo 7'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a668e3fa520460e9188f9_20231208_105329-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, avant les travaux', legende: 'Avant'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a668ea2d2e35ac5cb4c68_20231208_110432-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, avant les travaux', legende: 'Avant'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a668e929b842335cb0f3d_20231208_113118-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, avant les travaux', legende: 'Avant'}, affichage: 'pleine'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/662a668ecc8d2252b7294367_20231208_113318-p-1600.jpg', width: 500, height: 282, alt: 'Restaurant Le Mirefleurs, avant les travaux', legende: 'Avant'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Restaurant Le Mirefleurs : une nouvelle identité « steakhouse américain » pour un restaurant près de Bordeaux. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
  },
  {
    _id: 'projet-suite-cauderan',
    titre: 'Suite parentale Caudéran',
    slug: 'suite-parentale-cauderan',
    categorie: 'residentiel',
    typeDeBien: 'Appartement',
    typeDeProjet: 'Transformation d’une suite parentale',
    commune: 'Caudéran',
    departement: 'Gironde',
    resume: 'Une suite parentale transformée dans un immeuble bordelais.',
    imagePrincipale: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758edadd56262b2d79c709_20240618_111714-p-1600.jpg', width: 1600, height: 2842, alt: 'Suite parentale Caudéran'},
    demande: paragraphes('Transformation totale pour cette suite parentale d’un immeuble bordelais. La suite, composée de deux pièces contiguës, avait besoin d’un coup de jeune et de fonctionnel. Mes clients m’ont contactée pour les aider à réaliser ce projet.'),
    realisation: paragraphes('Le point de départ décoratif a été ce magnifique papier peint du Lac de Garde. Le lit a changé de position pour être face à la fenêtre. J’ai dessiné des placards sur mesure entourant la nouvelle tête de lit. Une banquette arrondie englobe la cloison entre les deux pièces pour assurer le lien. Enfin les aménagements du dressing et les portes ont été totalement revus, sur mesure également.'),
    galerie: [
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efe21ff8d083beaaa22_20240618_111626-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 2'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efd8079c7e9d7eed07d_20240618_111550-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, vue d’ensemble'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efd4bb1bfd618b75abc_20240618_111804-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 4'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efd4bb1bfd618b75aab_20240618_112030-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 5'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efd15e9ff0d47d2d174_20240618_112308-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 6'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efde2b4a7ef01a279ec_20240618_112826-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 7'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758efd948b79958f9c61c8_20240618_112835-p-1600.jpg', width: 500, height: 888, alt: 'Suite parentale Caudéran, photo 8'}, affichage: 'paire'},
      {image: {src: 'https://cdn.prod.website-files.com/6239daed454ddd32df1bfe6d/66758fa5dd56262b2d7ab0ac_20230918_150744-p-1600.jpg', width: 500, height: 282, alt: 'Suite parentale Caudéran, photo 9'}, affichage: 'pleine'},
    ],
    seo: {metaDescription: 'Suite parentale Caudéran : une suite parentale transformée dans un immeuble bordelais. Studio Jeanne, architecte d’intérieur à Bordeaux.'},
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
