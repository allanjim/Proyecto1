'use strict';
const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.api');


router.route('/registrar_pokemon')
    .post(function(req, res){
    pokemon.registrar(req, res);
});


router.route('/listar_pokemon')
    .get(function(req, res){
    pokemon.listar(req, res);
});


module.exports = router;