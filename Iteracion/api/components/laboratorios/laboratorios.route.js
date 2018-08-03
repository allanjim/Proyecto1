'use strict';
const express = require('express');
const router = express.Router();
const laboratoriosApi =  require('./laboratorios.api');

router.route('/registrar_laboratorio')
    .post(function(req, res){
        laboratoriosApi.registrar_laboratorio(req, res);
    });

router.route('/listar_laboratorio')
    .get(function(req, res){
        laboratoriosApi.listar_laboratorio(req, res)
    });

    module.exports = router;