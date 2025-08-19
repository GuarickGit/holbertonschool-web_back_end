export default function createReportObject(employeesList) {
  return {
    // Key allEmployees : contient directement l'objet reçu en paramètre
    allEmployees: employeesList,
    // Méthode getNumberOfDepartments : retourne le nombre de départements
    // Pour ça, on récupère les clés de l'objet avec Object.keys()
    // puis on compte combien il y en a grâce à .length
    getNumberOfDepartments(allEmployees) {
      return Object.keys(allEmployees).length;
    },
  };
}
