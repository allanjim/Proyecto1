'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    foto_usuario: { type: String},
    primer_nombre_usuario: { type: String, required: true },
    segundo_nombre_usuario: { type: String},
    primer_apellido_usuario: { type: String, required: true },
    segundo_apellido_usuario: { type: String},
    cedula_usuario: { type: String, required: true, unique: true},
    fechaNacimiento_usuario: { type: String, required: true },
    sexo_usuario : { type: String, required: true },
    correo_usuario: { type: String, unique: true, required: true },
    rol_usuario:{ type: String, required: true },
    contrasenna_usuario:{ type: String, required: true },
    contrasennaConfirmacion_usuario : { type: String, required: true }
});
/*instruccoon para exportar datos a la base de daros en forma de esquema moongoose*/
module.exports = mongoose.model('User', userSchema)