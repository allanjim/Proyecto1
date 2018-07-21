'use strict';
let mongoose = require('mongoose');

let pokemonSchema = new mongoose.Schema({
    nombre_pokemon : {type : String, unique: true, required : true},
    numero_pokemon : {type : String, unique: true, required: true},
    tipo_pokemon : {type : String, required : true},
    tipoSecundario_pokemon : {type : String},
    foto : {type: String, required: true}
});

module.exports = mongoose.model('Pokemon', pokemonSchema);