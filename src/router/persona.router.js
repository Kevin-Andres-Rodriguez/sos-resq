const express = require("express");

const router = express.Router();
const { mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/persona.controller");


router.get('/agregar',mostrar);
router.post('/agregar',mandar)
router.get('/listar',listar)
router.get('/editar/:id',traer)
router.post('/actualizar/:idpersona/:iddetalle',actualizar)
router.get('/eliminar/:id',eliminar)

module.exports = router;