'use strict';
const express = require('express');
const router = express.Router();
const gruposApi =  require('./grupos.api');

router.route('/registrar_grupos')
    .post(function(req, res){
        gruposApi.registrar(req, res);
    });

router.route('/listar_grupos')
    .get(function(req, res){
        gruposApi.listar_grupos(req, res)
    });

    module.exports = router;