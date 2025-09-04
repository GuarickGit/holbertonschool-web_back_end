// On importe Express (en syntaxe ES6 import)
import express from 'express';
// On importe le router défini dans routes/index.js
import router from './routes/index';

// Création d’une instance de l’application Express
const app = express();
// Définition du port sur lequel le serveur va écouter
const port = 1245;

// On "monte" le router sur la racine '/'
// => toutes les routes définies dans router seront accessibles à partir de la racine
app.use('/', router);

// On lance le serveur Express sur le port défini
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// On exporte l’app pour pouvoir l’utiliser dans d’autres fichiers (tests, etc.)
export default app;
