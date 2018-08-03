'use strict';

let mongoose = require('mongoose');

let grupoSchema = new mongoose.Schema({
    curso_grupo : {type: String, required: true},
    laboratorio_grupo : {type: String, required: true},
    profesor_grupo : {type: String, required: true},
    cupo_grupo : {type: Number, required: true},
    horario_grupo : {type: String, required: true},
    lunes_grupo : {type: String},
    martes_grupo : {type: String},
    miercoles_grupo : {type: String},
    jueves_grupo : {type: String},
    viernes_grupo : {type: String},
    sabado_grupo : {type: String}, 

});

module.exports = mongoose.model('Grupo', grupoSchema);