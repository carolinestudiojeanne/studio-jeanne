import type {Projet, Reglages} from './types'

export const SITE = 'https://www.studio-jeanne.com'

/** Adresse canonique absolue, sans barre finale (sauf pour l'accueil). */
export function canonique(chemin: string): string {
  const propre = chemin.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1')
  return `${SITE}${propre || '/'}`
}

/** Title automatique d'un projet : « Maison Ornano, rénovation complète à Mérignac · Studio Jeanne ». */
export function titreProjet(projet: Projet, suffixe = ' · Studio Jeanne'): string {
  if (projet.seo?.metaTitle) return projet.seo.metaTitle
  const type = projet.typeDeProjet ? `, ${projet.typeDeProjet.toLowerCase()}` : ''
  const lieu = projet.commune ? ` à ${projet.commune}` : ''
  const base = `${projet.titre}${type}${lieu}`
  // Au-delà de 60 caractères, Google coupe : on retire le suffixe plutôt que le lieu.
  return (base + suffixe).length <= 60 ? base + suffixe : base
}

/** Ligne de lieu d'un projet : « Rénovation complète · Mérignac, Gironde ». */
export function ligneLieu(p: {typeDeProjet?: string; commune?: string; departement?: string}): string {
  const lieu = [p.commune, p.departement && p.departement !== p.commune ? p.departement : null].filter(Boolean).join(', ')
  return [p.typeDeProjet, lieu].filter(Boolean).join(' · ')
}

/** Données structurées de l'entreprise, présentes sur toutes les pages. */
export function schemaEntreprise(r: Reglages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE}/#entreprise`,
    name: 'Studio Jeanne',
    alternateName: 'Studio Jeanne Intérieurs',
    description:
      'Studio Jeanne est un studio d’architecture intérieure fondé en 2021 à Bordeaux par Caroline Canova.',
    url: SITE,
    logo: `${SITE}/logo.svg`,
    image: `${SITE}/partage.png`,
    telephone: r.telephone ? `+33${r.telephone.replace(/\s/g, '').replace(/^0/, '')}` : undefined,
    email: r.email,
    founder: {'@id': `${SITE}/a-propos#caroline`},
    foundingDate: '2021',
    address: {
      '@type': 'PostalAddress',
      ...(r.afficherAdresse && r.adresse ? {streetAddress: r.adresse, postalCode: r.codePostal} : {}),
      addressLocality: r.ville || 'Bordeaux',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    },
    areaServed: [
      {'@type': 'City', name: 'Bordeaux'},
      {'@type': 'AdministrativeArea', name: 'Gironde'},
      {'@type': 'Place', name: 'Côte atlantique'},
    ],
    sameAs: [r.instagram, r.linkedin, r.ficheGoogle].filter(Boolean),
  }
}

export function schemaFilAriane(etapes: Array<{nom: string; chemin: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: etapes.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      item: canonique(e.chemin),
    })),
  }
}

export function schemaFaq(faq: Array<{question: string; reponse: string}> | undefined) {
  if (!faq?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {'@type': 'Answer', text: q.reponse},
    })),
  }
}
