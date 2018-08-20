'use strict';
let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre_hotel: { type: String, required: true },
    latitud_hotel : { type: String, required: true },
    longitud_hotel : { type: String, required: true },
    provincia_hotel: { type: String, required: true },
    canton_hotel: { type: String, required: true },
    distrito_hotel: { type: String, required: true },
    direccion_hotel: { type: String, required: true },
    correo_servicio_cliente : { type: String, unique: true, required: true },
    telefono_servicio_cliente  :{ type: Number, required: true },
    correo_reservaciones : { type: String, unique: true, required: true },
    telefono_reservaciones :{ type: Number, required: true },
    estado_hotel : { type: String, required: true },
    numEvaluaciones : { type: Number, required: true },
    sumEvaluaciones : { type: Number, required: true },
    ranking : { type: Number, required: true },
});
/*instruccion para exportar datos a la base de daros en forma de esquema moongoose*/
module.exports = mongoose.model('Hotel', hotelSchema)