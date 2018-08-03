'use strict';
const express = require('express');
const router = express.Router();
const periodos = require('./periodos.api');

router.route('/registrar_periodos')
    .post(function(req, res){
    periodos.registrar(req, res);
});

router.route('/listar_periodos')
    .get(function(req, res) {
        periodos.listar(req, res);
});

module.exports = router;