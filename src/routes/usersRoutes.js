const express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');


// Ruta para el formulario de Register
router.get('/register', usersController.register);
router.post ("/register", usersController.processRegister);

// Ruta para el formulario de Login
router.get('/login', usersController.login);
router.post("/login", usersController.processLogin)

module.exports = router;