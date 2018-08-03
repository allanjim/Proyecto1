'use strict';

let mongoose = require('mongoose');

let LabSchema = new mongoose.Schema({
    nombre_laboratorio : {type: String, required: true},
    codigo_laboratorio : {type: String, required: true},
    cupo_laboratorio : {type: Number, required: true},
    sede_laboratorio : {type: String, required: true}
});

module.exports = mongoose.model('Laboratorio', LabSchema);