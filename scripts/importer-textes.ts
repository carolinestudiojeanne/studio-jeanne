/**
 * Pré-remplit Sanity avec les textes du brief (pages fixes et réglages), une seule fois.
 * Les documents déjà existants ne sont pas touchés. Les images d'exemple ne sont pas importées.
 *
 * Usage : PUBLIC_SANITY_PROJECT_ID=xxx SANITY_API_WRITE_TOKEN=yyy npm run importer-textes
 */
import {createClient} from '@sanity/client'
import * as demo from '../src/lib/demo'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
if (!projectId || !token) {
  console.error('Renseignez PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}
const client = createClient({projectId, dataset: process.env.PUBLIC_SANITY_DATASET || 'production', apiVersion: '2026-10-01', token, useCdn: false})

/** Retire les images d'exemple (locales) et ajoute les _key manquantes dans les listes. */
function nettoyer(v: unknown): unknown {
  if (Array.isArray(v)) return v.map((x, i) => {
    const n = nettoyer(x)
    return n && typeof n === 'object' && !('_key' in n) ? {_key: `k${i}`, ...n} : n
  })
  if (v && typeof v === 'object') {
    if ('src' in v) return undefined
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nettoyer(x)]).filter(([, x]) => x !== undefined))
  }
  return v
}

const {texteA: a1, texteB: b1, ...accompagnement} = demo.pageAccompagnement
const {texteA: a2, texteB: b2, ...trouver} = demo.pageTrouverVotreBien

const docs: Array<Record<string, unknown>> = [
  {_id: 'reglages', _type: 'reglages', ...demo.reglages},
  {_id: 'pageAccueil', _type: 'pageAccueil', ...demo.pageAccueil},
  {_id: 'pageProjets', _type: 'pageProjets', ...demo.pageProjets},
  {_id: 'pageAccompagnement', _type: 'pageAccompagnement', ...accompagnement, horsPerimetre: a1, commandes: b1},
  {_id: 'pageTrouverVotreBien', _type: 'pageTrouverVotreBien', ...trouver, apresAchat: a2, deuxStructures: b2},
  {_id: 'pageAPropos', _type: 'pageAPropos', ...demo.pageAPropos},
  {_id: 'pageContact', _type: 'pageContact', ...demo.pageContact},
  {_id: 'pageProfessionnels', _type: 'pageProfessionnels', ...demo.pageProfessionnels},
  {_id: 'pageAvisClients', _type: 'pageAvisClients', ...demo.pageAvisClients},
  ...Object.entries(demo.pagesLegales).map(([id, p]) => ({_id: id, _type: 'pageLegale', ...p})),
]

const tx = client.transaction()
for (const doc of docs) tx.createIfNotExists(nettoyer(doc) as {_id: string; _type: string})
await tx.commit()
console.log(`${docs.length} documents créés (ceux qui existaient déjà n’ont pas été modifiés).`)
