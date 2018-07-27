'use strict';
const express = require('express');
const router = express.Router();
const publisherApi = require('./publishers.api');

router.route('/registrar_editorial')
    .post(function(req , res){
        publisherApi.registrar(req , res);
    });

router.route('/listar_editoriales')
    .get(function(req , res){
        publisherApi.listar_todos(req , res);
    });


module.exports = router;
