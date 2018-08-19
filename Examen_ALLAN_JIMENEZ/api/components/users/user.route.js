'use strict';
const express = require('express');
const router = express.Router();
const userApi = require('./user.api');

router.route('/registrar_usuarios')
    .post(function (req, res) {
        userApi.registrar_usuarios(req, res)
    });

router.route('/listar_usuarios')
    .get(function (req, res) {
        userApi.listar_usuarios(req, res)
    });

router.route('/buscar_usuario_id')
    .post(function (req, res) {
        userApi.buscar_usuario_por_id(req, res);
    });

router.route('/modificar_usuario')
    .post(function (req, res) {
        userApi.modificar_usuario(req, res);
    });

router.route('/eliminar_usuario')
    .post(function (req, res) {
        userApi.eliminar_usuario(req, res);
    });
module.exports = router;