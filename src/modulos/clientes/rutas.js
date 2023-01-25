const express = require('express');
const respuestas = require('../../red/respuestas');


const router = express.Router();

router.get('/', function(req, res){
    respuestas.success(req, res, 'Todo Ok desde clientes', 200);
});

module.exports = router;