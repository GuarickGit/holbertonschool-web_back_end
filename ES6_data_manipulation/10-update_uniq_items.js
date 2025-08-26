export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }

  // Parcourir chaque paire [clé, valeur] du Map
  for (const [key, value] of map) {
    // Si la quantité est égale à 1
    if (value === 1) {
      // Mettre à jour la valeur de cette clé à 100
      map.set(key, 100);
    }
  }

  return map;
}
