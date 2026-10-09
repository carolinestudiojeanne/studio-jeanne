/**
 * Les trois formulaires Tally de prise de contact, un par porte d'entrée (consignes de Caroline, 9 octobre 2026).
 * Chaque formulaire redirige, une fois envoyé, vers sa page de réservation Google Agenda :
 * aucun bouton du site ne mène directement à l'agenda. Si une adresse change ici, prévenir Caroline,
 * car les formulaires se renvoient aussi entre eux.
 */
export const FORMULAIRES = {
  /** Bien déjà trouvé ou achat en cours : page L'accompagnement, accueil (« Vous avez déjà votre maison », fin de page). */
  projet: 'https://tally.so/r/rjxXYv',
  /** Page Trouver votre bien, accueil (« Vous ne l'avez pas encore trouvée »). */
  trouver: 'https://tally.so/r/5ByR1M',
  /** Professionnels : aménager vos locaux. */
  professionnel: 'https://tally.so/r/LZA9Xl',
} as const
