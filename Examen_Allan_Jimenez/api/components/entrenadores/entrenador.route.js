'use strict';
const express = require('express');
const router = express.Router();
const entrenador = require('./entrenador.api');


router.route('/registrar_entrenador')
    .post(function(req, res){
    entrenador.registrar(req, res);
});

router.route('/agregar_pokemon')
.post(function(req, res){
entrenador.agregar_pokemon(req, res);
});

router.route('/listar_entrenador')
    .get(function(req, res){
    entrenador.listar(req, res);
});


module.exports = router;