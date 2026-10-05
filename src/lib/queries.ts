/** Requêtes GROQ vers Sanity. */

const carte = /* groq */ `
  _id,
  titre,
  "slug": slug.current,
  categorie,
  typeDeBien,
  typeDeProjet,
  "commune": select(commune == "autre" => communeAutre, commune),
  departement,
  porteDEntree,
  resume,
  imagePrincipale
`

const projetComplet = /* groq */ `
  ${carte},
  annee,
  surface,
  contexte,
  demande,
  realisation,
  galerie,
  avantApres,
  "video": video{lien, imageAttente, "fichierUrl": fichier.asset->url},
  retourClient,
  "projetsLies": projetsLies[]->{${carte}},
  seo,
  _updatedAt
`

export const Q = {
  reglages: /* groq */ `*[_id == "reglages"][0]`,
  page: /* groq */ `*[_id == $id][0]`,
  pageOffreAccompagnement: /* groq */ `*[_id == "pageAccompagnement"][0]{..., "texteA": horsPerimetre, "texteB": commandes}`,
  pageOffreTrouver: /* groq */ `*[_id == "pageTrouverVotreBien"][0]{..., "texteA": apresAchat, "texteB": deuxStructures}`,
  projets: /* groq */ `*[_type == "projet" && defined(slug.current)] | order(orderRank asc){${carte}}`,
  projetsAccueil: /* groq */ `*[_type == "projet" && defined(slug.current) && miseEnAvantAccueil == true] | order(orderRank asc)[0...4]{${carte}}`,
  projetsComplets: /* groq */ `*[_type == "projet" && defined(slug.current)] | order(orderRank asc){${projetComplet}}`,
  projetParId: /* groq */ `*[_type == "projet" && _id == $id][0]{${projetComplet}}`,
  avis: /* groq */ `*[_type == "avis"] | order(date desc, _id asc){_id, prenom, texte, note, date, source}`,
  avisAccueil: /* groq */ `*[_type == "avis" && miseEnAvantAccueil == true] | order(date desc)[0...3]{_id, prenom, texte, note, date, source}`,
}
