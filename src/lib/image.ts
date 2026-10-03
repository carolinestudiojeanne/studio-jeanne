import {createImageUrlBuilder} from '@sanity/image-url'
import {dataset, projectId} from './sanity'
import type {ImageData} from './types'

const builder = projectId ? createImageUrlBuilder({projectId, dataset}) : null

export interface ImageRendue {
  src: string
  srcset?: string
  width: number
  height: number
  alt: string
  legende?: string
  rendu3D?: boolean
}

/** Dimensions d'origine lues dans la référence Sanity : image-<id>-2000x1333-jpg */
function dimensions(image: ImageData): {w: number; h: number} {
  if (image.src) return {w: image.width || 1600, h: image.height || 1067}
  const m = image.asset?._ref.match(/-(\d+)x(\d+)-/)
  return m ? {w: Number(m[1]), h: Number(m[2])} : {w: 1600, h: 1067}
}

const LARGEURS = [480, 768, 1024, 1440, 1920, 2560]

/**
 * Prépare une image pour l'affichage : adresse, srcset en plusieurs tailles (AVIF/WebP automatiques),
 * dimensions déclarées. `ratio` (largeur / hauteur) recadre en respectant le point focal choisi dans Sanity.
 */
export function rendreImage(image: ImageData | undefined, opts: {ratio?: number; maxWidth?: number} = {}): ImageRendue | null {
  if (!image || (!image.asset && !image.src)) return null
  const {w, h} = dimensions(image)
  const ratio = opts.ratio
  const maxWidth = Math.min(opts.maxWidth || 2560, w)
  const height = (width: number) => Math.round(ratio ? width / ratio : (width * h) / w)

  if (image.src || !builder) {
    return {src: image.src || '', width: maxWidth, height: height(maxWidth), alt: image.alt || '', legende: image.legende, rendu3D: image.rendu3D}
  }

  const url = (width: number) => {
    let b = builder.image(image).width(width).auto('format').quality(78)
    if (ratio) b = b.height(height(width)).fit('crop')
    return b.url()
  }
  const largeurs = LARGEURS.filter((l) => l < maxWidth).concat(maxWidth)
  return {
    src: url(Math.min(1440, maxWidth)),
    srcset: largeurs.map((l) => `${url(l)} ${l}w`).join(', '),
    width: maxWidth,
    height: height(maxWidth),
    alt: image.alt || '',
    legende: image.legende,
    rendu3D: image.rendu3D,
  }
}

/** Adresse d'une image de partage (1200 × 630). */
export function imagePartageUrl(image: ImageData | undefined): string | undefined {
  if (!image) return undefined
  if (image.src) return image.src
  if (!builder || !image.asset) return undefined
  return builder.image(image).width(1200).height(630).fit('crop').auto('format').url()
}
