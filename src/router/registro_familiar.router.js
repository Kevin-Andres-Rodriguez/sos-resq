const express = require('express');

const router = express.Router();
const { mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/registro_familiar.controller");

// Rutas para los métodos del controlador
router.get('/agregar', mostrar);
router.post('/agregar', mandar);
router.get('/listar', listar);
router.get('/editar/:id', traer);
router.post('/actualizar/:idfamiliar/:iddetalle',actualizar);
router.get('/eliminar/:id', eliminar);

// Otras rutas y configuraciones de tu aplicación

module.exports = router;