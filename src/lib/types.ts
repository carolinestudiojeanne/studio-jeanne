/** Formes des contenus, telles que renvoyées par Sanity (ou par le contenu d'exemple). */

export type PortableText = Array<Record<string, unknown>>

/** Image Sanity, ou image locale (contenu d'exemple) avec `src`. */
export interface ImageData {
  asset?: {_ref: string}
  hotspot?: {x: number; y: number; width: number; height: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  /** Uniquement pour le contenu d'exemple. */
  src?: string
  width?: number
  height?: number
  alt?: string
  legende?: string
  rendu3D?: boolean
}

export interface Seo {
  metaTitle?: string
  metaDescription?: string
  imagePartage?: ImageData
}

export interface Reglages {
  telephone: string
  email: string
  adresse?: string
  codePostal?: string
  ville?: string
  afficherAdresse?: boolean
  zone?: string
  phraseLocale?: string
  lienTally?: string
  instagram?: string
  linkedin?: string
  ficheGoogle?: string
  lienLaisserAvis?: string
  homelikehome?: string
  nombreAvis?: number
  noteGoogle?: number
  suffixeTitre?: string
  imagePartage?: ImageData
}

export interface ProjetCarte {
  _id: string
  titre: string
  slug: string
  categorie: 'residentiel' | 'professionnel'
  typeDeBien?: string
  typeDeProjet?: string
  commune?: string
  departement?: string
  porteDEntree?: string
  resume?: string
  imagePrincipale?: ImageData
}

export interface Projet extends ProjetCarte {
  annee?: number
  surface?: number
  contexte?: PortableText
  demande?: PortableText
  realisation?: PortableText
  galerie?: Array<{_key?: string; image: ImageData; affichage?: 'pleine' | 'paire'}>
  avantApres?: Array<{_key?: string; avant: ImageData; apres: ImageData; legende?: string}>
  video?: {fichierUrl?: string; lien?: string; imageAttente?: ImageData}
  retourClient?: {citation?: string; prenom?: string}
  projetsLies?: ProjetCarte[]
  seo?: Seo
  _updatedAt?: string
}

export interface Avis {
  _id: string
  prenom: string
  texte: string
  note: number
  date: string
  source?: string
}

export interface SectionTexte {
  titre?: string
  texte?: PortableText
}
export interface SectionTexteImage extends SectionTexte {
  _key?: string
  image?: ImageData
}
export interface AppelAction {
  titre?: string
  texte?: string
  boutonLibelle?: string
}
export interface QuestionReponse {
  _key?: string
  question: string
  reponse: string
}

export interface ColonneAiguillage {
  surtitre?: string
  titre?: string
  texte?: string
  boutonLibelle?: string
  photo?: ImageData
}

export interface PageAccueil {
  hero?: {image?: ImageData; h1?: string; accroche?: string; sousTitre?: string; boutonLibelle?: string}
  projetsRecents?: {titre?: string; texte?: string; lienLibelle?: string}
  deroule?: {titre?: string; texte?: PortableText; lienLibelle?: string}
  aiguillage?: {
    titre?: string
    colonne1?: ColonneAiguillage
    colonne2?: ColonneAiguillage
  }
  caroline?: {image?: ImageData; texte?: string; lienLibelle?: string}
  avis?: {titre?: string; lienLibelle?: string}
  appel?: AppelAction
  seo?: Seo
}

export interface PageProjets {
  intro?: SectionTexte
  blocPro?: {image?: ImageData; titre?: string; texte?: string; lienLibelle?: string}
  seo?: Seo
}

export interface EtapeArche {
  _key?: string
  titre?: string
  texte?: string
  photo?: ImageData
}

export interface PageOffre {
  aiguillage?: {texte?: string; lienLibelle?: string}
  /** L'accompagnement : le déroulé en arche. */
  deroule?: {etapes?: EtapeArche[]; travaux?: EtapeArche}
  intro?: SectionTexte
  etapes?: SectionTexteImage[]
  texteA?: SectionTexte
  texteB?: SectionTexte
  faq?: QuestionReponse[]
  appel?: AppelAction
  lienHomelikeLibelle?: string
  seo?: Seo
}

export interface PageAPropos {
  titre?: string
  texte?: PortableText
  portrait?: ImageData
  portrait2?: ImageData
  imageEchoppe?: ImageData
  lienAvisLibelle?: string
  appel?: AppelAction
  seo?: Seo
}

export interface PageContact {
  intro?: SectionTexte
  boutonLibelle?: string
  coordonnees?: string
  zone?: SectionTexte
  faq?: QuestionReponse[]
  seo?: Seo
}

export interface PageSimple {
  intro?: SectionTexte
  appel?: AppelAction
  seo?: Seo
}

export interface PageLegale {
  titre?: string
  texte?: PortableText
  miseAJour?: string
  seo?: Seo
}
