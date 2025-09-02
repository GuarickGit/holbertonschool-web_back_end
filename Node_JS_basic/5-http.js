const http = require('http'); // Import du module http pour créer un serveur web
const { readFile } = require('fs'); // Import de la fonction readFile pour lire des fichiers

// Fonction qui lit un fichier CSV et compte les étudiants par filière
function countStudents(fileName) {
  const students = {}; // Objet pour stocker les étudiants par filière (ex: {CS: ['John', 'Jane']})
  const fields = {}; // Objet pour compter le nombre d'étudiants par filière (ex: {CS: 2})
  let length = 0; // Compteur du nombre total de lignes (donc d'étudiants)

  // La fonction retourne une Promesse car la lecture est asynchrone
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => { // Lecture du fichier CSV
      if (err) {
        reject(err); // En cas d'erreur de lecture, on rejette la Promesse
      } else {
        let output = ''; // Chaîne qui contiendra le résultat formaté
        const lines = data.toString().split('\n'); // On transforme le contenu du fichier en tableau de lignes

        // Parcours de toutes les lignes du fichier
        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i]) { // Vérifie que la ligne n'est pas vide
            length += 1; // Incrémente le compteur total
            const field = lines[i].toString().split(','); // Sépare la ligne par virgules (CSV)

            // Ajoute l'étudiant dans le bon tableau selon sa filière
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]); // Ajoute le prénom à la filière existante
            } else {
              students[field[3]] = [field[0]]; // Crée un nouveau tableau pour la filière
            }

            // Compte le nombre d’étudiants par filière
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }

        const l = length - 1; // On enlève l’en-tête (première ligne du CSV)
        output += `Number of students: ${l}\n`;

        // Ajoute dans la sortie le nombre d’étudiants et leurs prénoms par filière
        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'field') { // Ignore la colonne d’en-tête
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${students[key].join(', ')}\n`;
          }
        }
        resolve(output); // On résout la promesse avec le texte final
      }
    });
  });
}

// Création d’un serveur HTTP
const app = http.createServer((req, res) => {
  res.statusCode = 200; // Réponse OK
  res.setHeader('Content-Type', 'text/plain'); // Réponse en texte brut

  if (req.url === '/') { // Route racine "/"
    res.write('Hello Holberton School!');
    res.end();
  }

  if (req.url === '/students') { // Route "/students"
    res.write('This is the list of our students\n');

    // On appelle countStudents avec le fichier passé en argument au lancement du programme
    countStudents(process.argv[2].toString()).then((output) => {
      const outString = output.slice(0, -1); // Retire le dernier saut de ligne
      res.end(outString);
    }).catch(() => {
      res.statusCode = 404; // Si le fichier ne peut pas être lu
      res.end('Cannot load the database');
    });
  }
});

// Le serveur écoute sur le port 1245
app.listen(1245);

module.exports = app; // Export du serveur pour les tests
