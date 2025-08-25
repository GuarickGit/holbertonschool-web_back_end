export default function updateStudentGradeByCity(listOfStudents, city, newGrades) {
  // Étape 1 : on filtre uniquement les étudiants qui sont dans la ville demandée
  // .filter parcourt tout le tableau et garde seulement ceux dont la condition est vraie
  const studentsInCity = listOfStudents.filter((student) => student.location === city);

  // Étape 2 : on parcourt maintenant uniquement les étudiants de cette ville
  // .map transforme chaque élément en un nouvel objet (même nombre d'éléments qu'à l'entrée)
  const studentsWithGrades = studentsInCity.map((student) => {
    // Étape 2a : on cherche dans newGrades si une note existe pour cet étudiant
    // .find retourne le premier objet qui correspond, ou undefined si rien n'est trouvé
    const gradeObj = newGrades.find((g) => g.studentId === student.id);

    // Étape 2b : on retourne un nouvel objet étudiant
    // - On copie toutes les propriétés existantes de student avec l'opérateur "spread" (...)
    // - On ajoute une nouvelle clé "grade"
    //     → si gradeObj existe, on prend gradeObj.grade
    //     → sinon, on met "N/A"
    return {
      ...student,
      grade: gradeObj ? gradeObj.grade : "N/A",
    };
  });

  // Étape 3 : on retourne le tableau final des étudiants modifiés
  return studentsWithGrades;
}
