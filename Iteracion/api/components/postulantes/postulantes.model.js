'use strict';
let mongoose = require('mongoose');

let postulanteSchema = new mongoose.Schema({
    
    cedula_postulante: { type: Number, required: true },
    fecha_ingreso_postulante: { type: String, required: true },
    correo_postulante: { type: String, required: true },
    telefono_postulante: { type: Number, required: true },
    direccion_postulante: { type: String, required: true },
    carrera_postulante : { type: String, required: true }
});
/*instruccoon para exportar datos a la base de daros en forma de esquema moongoose*/
module.exports = mongoose.model('Postulante', postulanteSchema)