import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'a-remplacer',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Adresse de l'interface d'édition une fois publiée : https://studio-jeanne.sanity.studio
  studioHost: 'studio-jeanne',
  deployment: {appId: 'a8s8xaqviyff3h712vr3l14f', autoUpdates: true},
})
