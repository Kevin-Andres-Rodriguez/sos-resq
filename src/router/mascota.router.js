const express = require("express");
//const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

const router = express.Router();
const { mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/mascota.controller");


router.get('/agregar',mostrar);
router.post('/agregar',mandar)
router.get('/listar',listar)
router.get('/editar/:id',traer)
router.post('/actualizar/:idmascota/:iddetalle',actualizar)
router.get('/eliminar/:id',eliminar)

module.exports = router;