/**
 * Contenu d'origine de la carte de visite : affiché quand un champ est vide dans Sanity,
 * et envoyé dans Sanity par `npm run importer-carte`. Les photos sont dans public/carte-images.
 */
import type {ImageData} from './types'

export interface Lien {
  libelle: string
  url: string
}

export interface Carte {
  prenom: string
  nom: string
  portrait: ImageData
  metiers: Array<{metier: string; structure?: string}>
  boutonAjouter: string
  intro: string
  titreContact: string
  telephone: string
  emails: string[]
  titreTravail: string
  sousTitreTravail: string
  photos: Array<{image: ImageData; lieu?: string}>
  boutons: Lien[]
  logoClair: ImageData
  logoSombre: ImageData
  mentionBas: string
  ficheOrganisation: string
  ficheFonction: string
  ficheNote: string
  ficheLiens: Lien[]
  titreOnglet: string
  description: string
  imagePartage: ImageData
}

const local = (src: string, width: number, height: number, alt: string): ImageData => ({src: `/carte-images/${src}`, width, height, alt})

export const CARTE_ORIGINE: Carte = {
  prenom: 'Caroline',
  nom: 'Canova',
  portrait: local('portrait.jpg', 400, 500, 'Caroline Canova'),
  metiers: [
    {metier: 'Chasseuse en immobilier', structure: 'Homelike Home'},
    {metier: "Décoratrice et architecte d'intérieur", structure: 'Studio Jeanne'},
  ],
  boutonAjouter: 'Ajouter le contact',
  intro:
    "Je recherche des biens pour les acquéreurs que j'accompagne avec Homelike Home. Décoratrice et architecte d'intérieur depuis 2021, je visite chaque bien en voyant ce qu'il peut devenir. Une maison à rénover ou un plan mal distribué n'arrête pas mes clients quand ils savent ce qu'ils pourront en faire.",
  titreContact: 'Me joindre',
  telephone: '06 62 87 09 96',
  emails: ['caroline.canova@homelikehome.com', 'caroline@studio-jeanne.com'],
  titreTravail: "Mon travail de décoratrice et architecte d'intérieur",
  sousTitreTravail: 'Quelques projets menés avec Studio Jeanne, à Bordeaux et sur la côte atlantique.',
  photos: [
    {image: local('pessac.jpg', 900, 563, 'Entrée avec arche en chêne et niches arrondies, projet à Pessac'), lieu: 'Pessac'},
    {image: local('la-rochelle.jpg', 480, 600, 'Bibliothèque séparative en laiton et chêne devant un mur bleu, projet à La Rochelle'), lieu: 'La Rochelle'},
    {image: local('le-bouscat.jpg', 480, 600, 'Îlot cannelé blanc et tabourets en cuir, projet au Bouscat'), lieu: 'Le Bouscat'},
  ],
  boutons: [
    {libelle: 'Voir le site', url: 'https://studio-jeanne.com/'},
    {libelle: 'Instagram', url: 'https://www.instagram.com/studio._.jeanne/'},
    {libelle: 'Découvrir Homelike Home', url: 'https://www.homelikehome.com/'},
  ],
  logoClair: local('logo-clair.png', 360, 204, 'Studio Jeanne Intérieurs'),
  logoSombre: local('logo-sombre.png', 360, 204, 'Studio Jeanne Intérieurs'),
  mentionBas: 'Homelike Home · Studio Jeanne Intérieurs · Bordeaux',
  ficheOrganisation: 'Homelike Home',
  ficheFonction: "Chasseuse en immobilier, décoratrice et architecte d'intérieur",
  ficheNote:
    "Chasseuse en immobilier chez Homelike Home, partout en Gironde. Décoratrice et architecte d'intérieur chez Studio Jeanne depuis 2021.",
  ficheLiens: [
    {libelle: 'Homelike Home', url: 'https://www.homelikehome.com/'},
    {libelle: 'Studio Jeanne', url: 'https://studio-jeanne.com/'},
    {libelle: 'Instagram', url: 'https://www.instagram.com/studio._.jeanne/'},
    {libelle: 'Ma carte', url: 'https://studio-jeanne.com/carte'},
  ],
  titreOnglet: 'Carte Caroline Canova',
  description: "Chasseuse en immobilier, décoratrice et architecte d'intérieur",
  imagePartage: {src: 'https://www.studio-jeanne.com/carte-apercu.png', width: 1200, height: 630, alt: 'Studio Jeanne, intérieurs'},
}
