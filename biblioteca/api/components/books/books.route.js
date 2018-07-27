'use strict';
const express = require('express');
const router = express.Router();
const bookApi = require('./books.api');

router.route('/registrar_libro')
    .post(function(req , res){
        bookApi.registrar(req , res);
    });

router.route('/listar_libros')
    .get(function(req , res){
        bookApi.listar_todos(req , res);
    });
router.route('/buscar_libro_id')
    .post(function (req, res) {
        bookApi.buscar_libro_por_id(req, res);
    });

router.route('/modificar_libros')
	.post(function(req, res){
		bookApi.modificar_libros(req, res);
	});

module.exports = router;
