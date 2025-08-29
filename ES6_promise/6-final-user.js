// Import de la fonction qui retourne une promesse de création d'utilisateur
import signUpUser from "./4-user-promise.js";
// Import de la fonction qui retourne une promesse de téléchargement de photo
import uploadPhoto from "./5-photo-reject.js";

export default function handleProfileSignup(firstName, lastName, fileName) {
  // On exécute les deux promesses en parallèle
  // - signUpUser : retourne un objet { firstName, lastName } dans une promesse résolue
  // - uploadPhoto : retourne une promesse rejetée avec une erreur
  return Promise.allSettled([signUpUser(firstName, lastName), uploadPhoto(fileName)])
  // Quand toutes les promesses sont "settled" (résolues ou rejetées),
    // on parcourt le tableau de résultats pour formater chaque objet
    .then((result) => result.map((result) => {
      // Si la promesse a été résolue avec succès
      if (result.status === "fulfilled") {
        return { status: 'fulfilled', value: result.value };
      }
      // Si la promesse a été rejetée, on retourne la raison sous forme de string
      return { status: 'rejected', value: result.reason.toString() };
    }));
}
