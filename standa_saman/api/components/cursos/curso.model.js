'use strict';

let mongoose = require('mongoose');

let cursoSchema = new mongoose.Schema({

    nombre_curso : {type : String, required : true},
    codigo_curso : {type : String, unique : true, required : true},
    carrera_curso : {type : String, required : true},
    sede_curso : {type : String, required : true},
    creditos_curso :{type : Number, required : true},
    costo_curso : {type : Number, required : true},
    requisitos_curso : {type : String, required : true}
});
module.exports = mongoose.model('Curso', cursoSchema);