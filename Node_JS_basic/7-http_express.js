// Importation du framework Express
const express = require('express');

// Importation de la fonction readFile du module fs pour lire des fichiers
const { readFile } = require('fs');

// Création de l'application Express
const app = express();
const port = 1245;

// Fonction pour compter les étudiants à partir d'un fichier CSV
function countStudents(fileName) {
  const students = {}; // Objet qui va stocker les noms d'étudiants par filière
  const fields = {};   // Objet qui va stocker le nombre d'étudiants par filière
  let length = 0;      // Compteur du nombre total de lignes (étudiants inclus)

  return new Promise((resolve, reject) => {
    // Lecture asynchrone du fichier
    readFile(fileName, (err, data) => {
      if (err) {
        // Si le fichier ne peut pas être lu, on rejette la promesse
        reject(err);
      } else {
        let output = '';
        // Transformation du contenu en texte puis découpage en lignes
        const lines = data.toString().split('\n');

        // Parcours des lignes du fichier
        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i]) { // On ignore les lignes vides
            length += 1; // On incrémente le compteur d'étudiants

            // Découpage de la ligne CSV en colonnes (nom, prénom, etc.)
            const field = lines[i].toString().split(',');

            // field[0] = prénom, field[3] = filière (ex: CS, SWE...)

            // Ajout du prénom dans le tableau d'étudiants correspondant à la filière
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]);
            } else {
              students[field[3]] = [field[0]];
            }

            // Comptage du nombre d'étudiants dans la filière
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }

        // Le fichier contient un en-tête → on soustrait 1 au total
        const l = length - 1;
        output += `Number of students: ${l}\n`;

        // Construction du message pour chaque filière
        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'field') { // On ignore la ligne d'en-tête
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${students[key].join(', ')}\n`;
          }
        }

        // On résout la promesse avec le texte final
        resolve(output);
      }
    });
  });
}

// Route GET / → retourne un message d'accueil
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route GET /students → affiche la liste des étudiants
app.get('/students', (req, res) => {
  countStudents(process.argv[2].toString()).then((output) => {
    // Succès : on affiche le message suivi du rapport
    res.send(['This is the list of our students', output].join('\n'));
  }).catch(() => {
    // Erreur : impossible de charger le fichier
    res.send('This is the list of our students\nCannot load the database');
  });
});

// L'application écoute sur le port défini
app.listen(port, () => {
});

// Exportation de l'application pour les tests
module.exports = app;
