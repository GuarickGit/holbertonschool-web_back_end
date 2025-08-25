export default function createInt8TypedArray(length, position, value) {
  // On crée un "buffer" de mémoire brute de taille `length` octets
  const buffer = new ArrayBuffer(length);

  // On crée une "vue" (DataView) qui permet de lire/écrire dans ce buffer
  const view = new DataView(buffer);

  // Vérification : la position doit être dans la plage [0, length - 1]
  if (position < 0 || position >= length) {
    // Si la position est invalide → on lance une erreur avec le message exact demandé
    throw new Error("Position outside range");
  }

  // On écrit la valeur en entier signé sur 1 octet (Int8) à l'index `position`
  view.setInt8(position, value);

  // On retourne la vue (DataView) qui contient la valeur écrite
  return view;

}

  // NOTES:

  // -------------------------
  // ArrayBuffer :
  // -------------------------
  // - C'est une "boîte mémoire brute"
  // - Elle contient `length` octets (cases mémoire vides au départ, remplies avec 0)
  // - Exemple : new ArrayBuffer(4) => crée 4 cases mémoire [0, 0, 0, 0]


  // -------------------------
  // DataView :
  // -------------------------
  // - C'est une "vue" (outil) qui permet de lire/écrire dans un ArrayBuffer
  // - Sans DataView, on ne peut pas manipuler directement les valeurs de la mémoire
  // - Avec DataView, on choisit quel type on utilise (Int8, Uint8, Int16, Float32, etc.)


  // -------------------------
  // Int8 :
  // -------------------------
  // - "Int" = entier
  // - "8" = 8 bits = 1 octet
  // - C'est un entier signé => peut être négatif ou positif
  // - Valeurs possibles : de -128 à 127
  // - Exemple : setInt8(0, 42) => écrit 42 dans la première case
  //             setInt8(0, -50) => écrit -50
  //             setInt8(0, 200) => 200 est trop grand, il est transformé en -56
