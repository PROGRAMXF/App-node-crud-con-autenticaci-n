const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');


const router = express.Router();

router.get('/', function(req, res){
    const todos = controlador.todos();
    respuestas.success(req, res, todos, 200);
});

module.exports = router;