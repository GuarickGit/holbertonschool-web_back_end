export default function hasValuesFromArray(set, array) {

  return array.every((element) => set.has(element));

  // array.every(...) → parcourt tous les éléments du tableau,
  // pour chaque element → set.has(element) vérifie s’il est présent,
  // si tous passent → true, sinon dès qu’un échoue → false.
}
