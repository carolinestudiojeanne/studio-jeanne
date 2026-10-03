import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {BookIcon} from '@sanity/icons/Book'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {pagesFixes} from './schemaTypes/pages'

export const PAGES_LEGALES = [
  {id: 'mentions-legales', title: 'Mentions légales'},
  {id: 'politique-de-confidentialite', title: 'Politique de confidentialité'},
  {id: 'cgv', title: 'CGV'},
]

/** Menu de gauche de l'interface d'édition, pensé pour Caroline. */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Studio Jeanne')
    .items([
      orderableDocumentListDeskItem({
        type: 'projet',
        title: 'Projets',
        icon: HomeIcon,
        S,
        context,
      }),
      S.documentTypeListItem('avis').title('Avis clients').icon(CommentIcon),
      S.divider(),
      S.listItem()
        .title('Pages du site')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages du site')
            .items(
              pagesFixes.map((p) =>
                S.listItem()
                  .title(p.title || p.name)
                  .id(p.name)
                  .child(S.document().schemaType(p.name).documentId(p.name).title(p.title || p.name)),
              ),
            ),
        ),
      S.listItem()
        .title('Pages légales')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Pages légales')
            .items(
              PAGES_LEGALES.map((p) =>
                S.listItem()
                  .title(p.title)
                  .id(p.id)
                  .child(S.document().schemaType('pageLegale').documentId(p.id).title(p.title)),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .child(S.document().schemaType('reglages').documentId('reglages').title('Réglages du site')),
      S.divider(),
      S.documentTypeListItem('article').title('Journal (plus tard)').icon(BookIcon),
    ])
