'use strict';
const express = require('express');
const router = express.Router();
const hotelApi = require('./hotel.api');

router.route('/registrar_hotel')
    .post(function (req, res) {
        hotelApi.registrar_hoteles(req, res)
    });

router.route('/listar_hoteles')
    .get(function (req, res) {
        hotelApi.listar_hoteles(req, res)
    });

router.route('/buscar_hotel_id')
    .post(function (req, res) {
        hotelApi.buscar_hotel_por_id(req, res);
    });

router.route('/modificar_hotel')
    .post(function (req, res) {
        hotelApi.modificar_hotel(req, res);
    });

router.route('/eliminar_hotel')
    .post(function (req, res) {
        hotelApi.eliminar_hotel(req, res);
    });
module.exports = router;

router.route('/evaluar_hotel')
    .post(function (req, res) {
        hotelApi.evaluar_hotel(req, res);
    });
module.exports = router;

router.route('/ranking_hotel')
    .post(function (req, res) {
        hotelApi.listar_ranking_hoteles(req, res);
    });
module.exports = router;