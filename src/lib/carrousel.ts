/**
 * Place d'un projet dans le carrousel de l'accueil, selon le projet au centre :
 * 'g2' 'g1' 'centre' 'd1' 'd2', ou undefined s'il est hors champ. La liste tourne en boucle.
 */
export function placeCarrousel(i: number, centre: number, n: number): string | undefined {
  const moitie = Math.floor(n / 2)
  const ecart = ((i - centre + n + moitie) % n) - moitie
  if (ecart === 0) return 'centre'
  if (Math.abs(ecart) > 2) return undefined
  return `${ecart < 0 ? 'g' : 'd'}${Math.abs(ecart)}`
}
