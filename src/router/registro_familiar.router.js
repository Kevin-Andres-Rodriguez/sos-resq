const express = require('express');
const { isLoggedIn } = require('../lib/auth');
const router = express.Router();
const { mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/registro_familiar.controller");

// Rutas para los métodos del controlador
router.get('/agregar',isLoggedIn, mostrar);
router.post('/agregar',isLoggedIn, mandar);
router.get('/listar',isLoggedIn, listar);
router.get('/editar/:id',isLoggedIn, traer);
router.post('/actualizar/:idfamiliar/:iddetalle',isLoggedIn,actualizar);
router.get('/eliminar/:id',isLoggedIn, eliminar);

// Otras rutas y configuraciones de tu aplicación

module.exports = router;