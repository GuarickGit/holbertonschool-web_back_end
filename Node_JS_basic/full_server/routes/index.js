// On importe Express, le framework pour créer des applications web en Node.js
const express = require('express');
// On importe le contrôleur qui gère la page d’accueil
const AppController = require('../controllers/AppController');
// On importe le contrôleur qui gère les routes liées aux étudiants
const StudentsController = require('../controllers/StudentsController');

// Création d’un "router" qui permettra de définir les routes de l’application
const router = express.Router();

// Route GET pour la page d’accueil "/"
// Quand un client accède à la racine, la méthode getHomepage du AppController est appelée
router.get('/', AppController.getHomepage);

// Route GET pour "/students"
// Quand un client accède à /students, la méthode getAllStudents du StudentsController est appelée
router.get('/students', StudentsController.getAllStudents);

// Route GET pour "/students/:major"
// ":major" est un paramètre dynamique (CS ou SWE)
// Cette requête est gérée par la méthode getAllStudentsByMajor du StudentsController
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

// On exporte le router afin de pouvoir l’utiliser dans l’application principale (app.js ou server.js)
module.exports = router;
