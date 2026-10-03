import {toHTML, escapeHTML} from '@portabletext/to-html'
import type {PortableText} from './types'

/** Transforme un texte riche Sanity en HTML. Les liens externes s'ouvrent dans un nouvel onglet. */
export function texteEnHtml(blocks: PortableText | undefined): string {
  if (!blocks?.length) return ''
  return toHTML(blocks as never, {
    components: {
      marks: {
        link: ({children, value}) => {
          const href = String(value?.href || '')
          const externe = /^https?:\/\//.test(href) && !href.includes('studio-jeanne.com')
          return `<a href="${escapeHTML(href)}"${externe ? ' target="_blank" rel="noopener"' : ''}>${children}</a>`
        },
      },
    },
  })
}

/** Texte brut d'un texte riche (pour les métadonnées). */
export function texteBrut(blocks: PortableText | undefined): string {
  if (!blocks?.length) return ''
  return blocks
    .map((b) => ((b.children as Array<{text?: string}>) || []).map((c) => c.text || '').join(''))
    .join(' ')
    .trim()
}

/** Raccourci pour écrire un texte riche à partir de paragraphes (contenu d'exemple). */
export function paragraphes(...textes: string[]): PortableText {
  return textes.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
  }))
}
