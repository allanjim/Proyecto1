'use strict';

let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    profesor_solicitud : {type : String, required : true},
    carrera_solicitud : {type : String, required : true},
    curso_solicitud : {type : String, required : true},
    periodo_solicitud : {type : String, required : true},
    nombre_solicitud : {type : String, required : true},
    estado_solicitud : {type : String}
});
module.exports = mongoose.model('Solicitud', solicitudSchema);