const { readFile } = require('fs');

// Fonction asynchrone qui lit un fichier CSV et retourne un objet
async function readDatabase(path) {
  return new Promise((resolve, reject) => {
    // Lecture du fichier en asynchrone
    readFile(path, (err, data) => {
      if (err) {
        // Si le fichier n'est pas lisible → on rejette la promesse avec l'erreur
        reject(err);
        return;
      }

      const students = {}; // Objet qui contiendra les prénoms regroupés par filière

      // On transforme le contenu en texte puis on découpe par lignes
      const lines = data.toString().split('\n');

      // On commence à l'index 1 pour ignorer la première ligne (l'en-tête du CSV)
      for (let i = 1; i < lines.length; i += 1) {
        if (lines[i]) { // On ignore aussi les lignes vides éventuelles
          // On découpe la ligne CSV par virgule
          const parts = lines[i].split(',');

          // parts[0] → prénom, parts[3] → filière

          // Si la filière existe déjà → on ajoute le prénom
          if (students[parts[3]]) {
            students[parts[3]].push(parts[0]);
          } else {
            // Sinon → on crée un tableau avec ce prénom
            students[parts[3]] = [parts[0]];
          }
        }
      }

      // On résout la promesse avec l'objet final
      resolve(students);
    });
  });
}

// On exporte la fonction pour l'utiliser dans les autres fichiers
module.exports = readDatabase;
