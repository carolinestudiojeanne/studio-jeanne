# Studio Jeanne : site et interface d’édition

Site de Caroline Canova, architecte d’intérieur à Bordeaux. Référence : le cahier des charges du 3 octobre 2026.

| Dossier | Ce que c’est | Hébergement |
|---|---|---|
| `/` (racine) | Le site, en Astro (pages statiques, très rapides) | Netlify |
| `/studio` | L’interface d’édition de Caroline (Sanity Studio) | `https://studio-jeanne.sanity.studio` |

Tant que le site n’est pas relié à Sanity, il s’affiche avec du **contenu d’exemple** (les textes du brief, des projets fictifs et des images « Photo à venir ») et un bandeau le signale.

## Travailler en local

```bash
npm install
npm run dev            # le site sur http://localhost:4321

cd studio && npm install
npm run dev            # l’interface d’édition sur http://localhost:3333
```

Copier `.env.example` en `.env` (et `studio/.env.example` en `studio/.env`) et remplir les valeurs.

## Mise en place (une seule fois, comptes au nom de Caroline)

1. **Sanity** : créer un compte sur sanity.io, puis un projet « Studio Jeanne » (plan gratuit), jeu de données `production`. Noter le *Project ID*.
   - Dans *API > CORS origins*, ajouter `http://localhost:4321`, `http://localhost:3333`, l’adresse Netlify et `https://www.studio-jeanne.com`.
   - Dans *API > Tokens*, créer un jeton **Viewer** (pour l’aperçu) et un jeton **Editor** (pour l’import des textes, à supprimer ensuite).
2. **Pré-remplir les textes** : `PUBLIC_SANITY_PROJECT_ID=… SANITY_API_WRITE_TOKEN=… npm run importer-textes`.
3. **Publier l’interface d’édition** : `cd studio && npx sanity login && npx sanity deploy`.
4. **Netlify** : nouveau site depuis ce dépôt GitHub. Les réglages de construction sont lus dans `netlify.toml`. Variables d’environnement à saisir :
   - `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN` (jeton Viewer) et `SANITY_PREVIEW_SECRET` (un mot de passe au choix)
   - `PUBLIC_GA_ID` (identifiant de mesure Google Analytics existant de Caroline)
   - `PUBLIC_NOINDEX=true` jusqu’au jour de la mise en ligne
5. **Publication automatique** : dans Netlify, *Build hooks* > créer un hook ; dans Sanity, *API > Webhooks* > coller l’adresse du hook (déclencheur : création, mise à jour, suppression). Chaque publication de Caroline reconstruit le site en une à deux minutes.
6. **Bouton « Voir la page »** : dans `studio/.env`, `SANITY_STUDIO_SITE_URL` = l’adresse Netlify et `SANITY_STUDIO_PREVIEW_SECRET` = la même valeur que `SANITY_PREVIEW_SECRET`, puis redéployer le Studio.
7. **Avis Google automatiques** (`netlify/functions/avis-google.mts`, une fois par jour) : ajoute dans Sanity les nouveaux avis Google 5 étoiles avec texte, sans doublon. Inactif tant que les variables ci-dessous manquent.
   - Caroline ajoute la personne qui s’en occupe comme **gestionnaire** de sa fiche (business.google.com > Paramètres > Personnes et accès).
   - Dans Google Cloud (même compte) : créer un projet, demander l’accès à l’API Google Business Profile (formulaire « GBP API access », réponse en quelques jours à quelques semaines), puis activer *My Business Account Management API* et *Google My Business API*.
   - Créer un identifiant OAuth (type « Application Web », adresse de redirection `https://developers.google.com/oauthplayground`), puis obtenir un *refresh token* dans OAuth Playground avec le droit `https://www.googleapis.com/auth/business.manage` (cocher « Use your own OAuth credentials »).
   - Retrouver les identifiants : `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts` (→ `accounts/123…`), puis `GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/123…/locations?readMask=name,title` (→ `locations/456…`).
   - Variables Netlify : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_ACCOUNT_ID` (chiffres seuls), `GOOGLE_LOCATION_ID` (chiffres seuls), `SANITY_API_WRITE_TOKEN` (jeton **Editor**, à garder cette fois) et `NETLIFY_BUILD_HOOK` (l’adresse du hook de l’étape 5).
   - Les avis ajoutés n’apparaissent pas sur l’accueil : cocher « Afficher sur l’accueil » dans Sanity pour cela.

## Où changer quoi

| Pour… | Fichier |
|---|---|
| Basculer le texte courant de gris à ardoise | `src/styles/global.css`, variable `--texte` |
| Couleurs, tailles, espacements | `src/styles/global.css` (haut du fichier) |
| Remplacer le logo provisoire | `src/components/Logo.astro`, `public/logo.svg`, `public/favicon.svg` |
| Le menu | `src/lib/navigation.ts` |
| Les redirections 301 | `public/_redirects` |
| Les champs que Caroline remplit | `studio/schemaTypes/` |
| Le gabarit des pages projet | `src/components/projet/PageProjet.astro` |

## À savoir

- La police Glacial Indifference (licence libre OFL) est servie depuis `public/fonts`. Elle n’a pas les guillemets « » ni le point médian : le navigateur les affiche avec la police de secours, l’écart est minime.
- Les textes marqués « exemple » ou « à écrire » sont à remplacer dans Sanity.

## Compléments au cahier des charges

### 9 octobre 2026 : page L'accompagnement, le déroulé en arche

Demande de Caroline : présenter le déroulé d'un projet le long de l'arche du logo
(composant `src/components/sections/DerouleArche.astro`, placé après l'introduction de la page).

Les étapes reprennent les phases des devis, pour que le client retrouve les mêmes mots au moment de signer :

1. **Écoute** : comprendre comment vous vivez, et poser ensemble le cahier des charges.
2. **Aménagement** : plans 2D avec plusieurs scénarios d'implantation, et planches d'ambiance.
3. **Modélisation 3D** : votre futur intérieur en vidéo photoréaliste (matériaux, mobilier, éléments sur mesure).
4. **Plans techniques** : plans du mobilier sur mesure et implantations techniques, prêts pour les artisans.
5. **Sélection** : les matériaux et, selon le projet, le mobilier et les luminaires. Accompagnement en showroom.

Puis, au-delà de l'ouverture de l'arche : **Les travaux**, avec le suivi de chantier par un maître d'œuvre partenaire.
Si le client préfère piloter lui-même, Caroline présente le projet aux artisans et passe en cours de chantier pour les choix décoratifs.

Intentions de mise en forme :

- le parcours part du pied de l'arche, en bas à gauche, avec l'Écoute ;
- la Modélisation 3D est au sommet de la courbe, c'est voulu : c'est ce qui distingue Caroline ;
- l'arche a la forme du filet du logo (trait vertical, angle arrondi, trait horizontal) : Plans techniques et Sélection suivent le trait horizontal, jusqu'à l'ouverture ;
- « Les travaux » est juste après l'ouverture, en dehors du trait, et se distingue visuellement des cinq étapes : ce n'est pas une phase de la prestation, c'est le moment où Caroline passe la main ;
- sur ordinateur, grande arche centrée avec seulement les titres des étapes sur les points ; un clic sur un point affiche la description de l'étape à l'intérieur de l'arche (l'étape 1 est affichée d'emblée, l'étape choisie passe en ocre) ;
- sur mobile, le déroulé passe à la verticale en gardant l'arche comme motif.

### 9 octobre 2026 : prise de contact (remplace entièrement le point 10)

Plus de formulaire unique avec bifurcation, mais trois formulaires Tally, un par porte d'entrée
(adresses centralisées dans `src/lib/formulaires.ts` ; si l'une change, prévenir Caroline, car les formulaires se renvoient entre eux) :

| Formulaire | Adresse | Où |
| --- | --- | --- |
| Parlons de votre projet (bien trouvé ou achat en cours) | https://tally.so/r/rjxXYv | page L'accompagnement, bouton « Vous avez déjà votre maison » de l'accueil, fin de page d'accueil, pages projet de particuliers |
| Trouver votre bien | https://tally.so/r/5ByR1M | page Trouver votre bien, bouton « Vous ne l'avez pas encore trouvée » de l'accueil |
| Aménager vos locaux (professionnels) | https://tally.so/r/LZA9Xl | page Professionnels, pages projet professionnels |

- Page Contact : deux grandes entrées pour les deux premiers formulaires (mêmes formulations que le bloc d'aiguillage de l'accueil), puis une entrée professionnels, visible mais un cran en dessous : « Vous êtes un professionnel ? Parlons de vos locaux ».
- Chaque formulaire redirige, une fois envoyé, vers la page de réservation Google Agenda de Caroline. Plus de Calendly.
- Le premier rendez-vous est un appel téléphonique de trente minutes (et non plus une visio d'une heure).
- Aucun bouton ne mène directement à l'agenda : on passe toujours par un formulaire.
- Le champ « Lien Tally » des réglages du site n'est plus utilisé.
