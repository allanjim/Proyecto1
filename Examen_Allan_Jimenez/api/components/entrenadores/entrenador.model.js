'use strict';
let mongoose = require('mongoose');

let entrenadorSchema = new mongoose.Schema({
    nombre_entrenador : {type : String, unique: true, required : true},
    numero_entrenador : {type : String, unique: true, required: true},
    edad_entrenador : {type : String, required : true},
    sexo_entrenador : {type : String},
    foto : {type: String}
});

module.exports = mongoose.model('Entrenador', entrenadorSchema);