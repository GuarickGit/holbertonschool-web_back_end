export default function guardrail(mathFunction) {
  // On initialise une queue qui contiendra le résultat ou l'erreur
  const queue = [];

  try {
    // On essaie d'exécuter la fonction passée en paramètre
    // Si tout se passe bien, on ajoute son résultat dans la queue
    queue.push(mathFunction());
  } catch (error) {
    // Si une erreur survient, on attrape l'erreur
    // et on ajoute son message (sous forme de chaîne) dans la queue
    queue.push(error.toString());
  } finally {
    // Que la fonction réussisse ou échoue, on ajoute toujours ce message
    // Cela permet de tracer que la fonction a bien été traitée
    queue.push('Guardrail was processed');
  }

  // On retourne la queue contenant :
  // - soit le résultat et le message final
  // - soit le message d'erreur et le message final
  return queue;
}
