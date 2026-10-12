import {imageAlt} from './objects/imageAlt'
import {seo} from './objects/seo'
import {texteRiche} from './objects/texteRiche'
import {appelAction, ligneAiguillage, questionReponse, sectionTexte, sectionTexteImage} from './objects/sections'
import {avantApres, imageGalerie, retourClient, video} from './objects/projet-parts'
import {projet} from './documents/projet'
import {avis} from './documents/avis'
import {reglages} from './documents/reglages'
import {pageLegale} from './documents/pageLegale'
import {etapeArche, pagesFixes} from './pages'

export const schemaTypes = [
  // objets
  imageAlt,
  seo,
  texteRiche,
  sectionTexte,
  sectionTexteImage,
  appelAction,
  ligneAiguillage,
  questionReponse,
  imageGalerie,
  avantApres,
  retourClient,
  video,
  etapeArche,
  // documents
  projet,
  avis,
  reglages,
  pageLegale,
  ...pagesFixes,
]

/** Documents uniques : on ne peut ni en créer d'autres, ni les supprimer. */
export const SINGLETONS = [
  'reglages',
  ...pagesFixes.map((p) => p.name),
]
