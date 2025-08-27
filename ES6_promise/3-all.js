// On importe les fonctions uploadPhoto et createUser depuis utils.js
// Ce sont des exports nommés, d'où l'utilisation des accolades { }
import { uploadPhoto, createUser } from "./utils.js";

export default function handleProfileSignup() {
  // On lance les 2 appels en parallèle (sans await)
  // Chaque fonction retourne une Promise
  const photoPromise = uploadPhoto();
  const userPromise = createUser();

  // On utilise Promise.all pour attendre la résolution des 2 Promises
  // → si les 2 réussissent, on reçoit un tableau de résultats
  // → si une échoue, tout le Promise.all échoue
  return Promise.all([photoPromise, userPromise])
    // Le then est exécuté si TOUTES les promesses réussissent
    // On déstructure le tableau [résultatPhoto, résultatUser]
    .then(([photo, user]) => {
      // On affiche dans la console: body firstName lastName
      // Exemple attendu : "photo-profile-1 Guillaume Salva"
      console.log(`${photo.body} ${user.firstName} ${user.lastName}`);
    })
    // Le catch est exécuté si au moins une des promesses échoue
    .catch(() => {
      // On affiche le message d'erreur demandé
      console.log("Signup system offline");
    });
}
