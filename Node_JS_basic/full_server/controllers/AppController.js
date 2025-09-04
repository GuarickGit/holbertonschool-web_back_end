// Définition d'une classe contrôleur qui gère la logique liée aux routes de l'application
class AppController {
  // Méthode statique accessible sans créer d'instance de la classe
  // Elle prend en paramètre l'objet request (la requête entrante)
  // et response (la réponse envoyée au client)
  static getHomepage(request, response) {
    // On définit le code de statut HTTP à 200 (succès)
    // et on envoie le texte "Hello Holberton School!" comme réponse
    response.status(200).send('Hello Holberton School!');
  }
}

// On exporte la classe AppController afin de pouvoir l'importer dans d'autres fichiers
module.exports = AppController;
