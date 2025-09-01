// On importe le module 'fs' de Node.js pour manipuler les fichiers
const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    // Lecture synchrone du fichier en UTF-8
    data = fs.readFileSync(path, { encoding: 'utf8' });
  } catch (e) {
    // Si le fichier n'existe pas ou est inaccessible, on lève une erreur
    throw new Error('Cannot load the database');
  }

  // On découpe le fichier en lignes
  const splittedData = data.split('\n');

  // On enlève la première ligne (l'entête CSV) et les éventuelles lignes vides
  const lines = splittedData.slice(1).filter((line) => line.trim() !== '');

  // Chaque ligne est transformée en tableau de colonnes (séparateur = ',')
  const students = lines.map((line) => line.split(','));

  // Objet pour regrouper les prénoms par "field"
  const groups = {};

  // On parcourt chaque étudiant
  students.forEach((student) => {
    const firstname = student[0]; // Le prénom est en première colonne
    const field = student[student.length - 1]; // Le "field" est en dernière colonne

    // Si le field n'existe pas encore dans l'objet groups, on le crée
    if (!groups[field]) {
      groups[field] = [];
    }

    // On ajoute le prénom de l'étudiant dans la bonne liste
    groups[field].push(firstname);
  });

  // Affichage du nombre total d'étudiants
  console.log(`Number of students: ${students.length}`);

  // Affichage du nombre et de la liste des étudiants pour chaque field
  for (const field in groups) {
    // Guard pour s'assurer qu'on ne parcourt que les propriétés "propres" de l'objet
    if (Object.prototype.hasOwnProperty.call(groups, field)) {
      console.log(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
    }
  }
}

// On exporte la fonction pour qu'elle soit utilisable ailleurs
module.exports = countStudents;
