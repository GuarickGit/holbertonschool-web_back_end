// On importe la fonction readDatabase depuis le dossier utils
// Cette fonction permet de lire et traiter les données du fichier database.csv
const readDatabase = require('../utils');

class StudentsController {
  // Méthode pour récupérer TOUS les étudiants regroupés par filière
  static getAllStudents(request, response) {
    // process.argv[2] correspond au chemin du fichier de base de données passé en argument lors du lancement du serveur
    readDatabase(process.argv[2])
      .then((students) => {
        // Texte de réponse initial
        let output = 'This is the list of our students\n';

        // Récupère la liste des filières (les clés de l'objet students)
        const fields = Object.keys(students);
        // Trie les filières par ordre alphabétique (insensible à la casse)
        fields.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        // Pour chaque filière, on construit une ligne avec le nombre d’étudiants et leur liste
        fields.forEach((field) => {
          const list = students[field];
          output += `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`;
        });

        // Envoie la réponse finale avec statut HTTP 200
        response.status(200).send(output.trim());
      })
      .catch(() => {
        // En cas d’erreur (par ex. fichier introuvable), on renvoie un statut 500
        response.status(500).send('Cannot load the database');
      });
  }

  // Méthode pour récupérer uniquement les étudiants d’une filière donnée (CS ou SWE)
  static getAllStudentsByMajor(request, response) {
    // Récupère la valeur du paramètre "major" dans l’URL
    const { major } = request.params;

    // Vérifie que le paramètre est bien "CS" ou "SWE"
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Lit la base de données
    readDatabase(process.argv[2])
      .then((students) => {
        // Récupère la liste des étudiants correspondant au major demandé
        const list = students[major] || [];
        // Construit la réponse (simple liste de noms)
        const output = `List: ${list.join(', ')}`;
        response.status(200).send(output);
      })
      .catch(() => {
        // En cas d’erreur, renvoie un message d’échec
        response.status(500).send('Cannot load the database');
      });
  }
}

// On exporte la classe pour pouvoir l’utiliser dans d’autres fichiers (par ex. routes)
module.exports = StudentsController;
