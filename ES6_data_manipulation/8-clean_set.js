export default function cleanSet(set, startString) {
  // Si la chaîne de départ est vide, on retourne une chaîne vide directement
  if (startString === "") {
    return "";
  }

  // Tableau qui va contenir les morceaux de chaînes filtrés
  const result = [];

  // On parcourt chaque valeur du Set
  for (const value of set) {
    // On vérifie que la valeur est bien une chaîne et qu'elle commence par startString
    if (typeof value === "string" && value.startsWith(startString)) {
      // On retire la partie 'startString' au début et on garde le reste
      result.push(value.slice(startString.length));
    }
  }

  // On assemble tous les morceaux en une seule chaîne séparée par des '-'
  return result.join("-");
}
