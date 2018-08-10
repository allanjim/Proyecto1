'use strict';
const express = require('express');
const router = express.Router();
const postulanteApi = require('./postulantes.api');

router.route('/registrar_postulante')
    .post(function (req, res) {
        postulanteApi.registrar_postulante(req, res)
    });

router.route('/listar_postulante')
    .get(function (req, res) {
        postulanteApi.listar_postulante(req, res)
    });

router.route('/buscar_postulante')
    .post(function (req, res) {
        postulanteApi.buscar_postulante(req, res);
    });

router.route('/modificar_postulante')
    .post(function (req, res) {
        postulanteApi.modificar_postulante(req, res);
    });

router.route('/eliminar_postulante')
    .post(function (req, res) {
        postulanteApi.eliminar_postulante(req, res);
    });
module.exports = router;