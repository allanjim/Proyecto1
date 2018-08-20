'use strict';
const pokemonModel = require('./pokemon.model');

//Función para registrar un usuario
module.exports.registrar = function(req, res){
    //Crea una variable nuevoUsuario utilizando como plantilla el userModel
    let nuevoPokemon = new pokemonModel({
        nombre_pokemon : req.body.nombre_pokemon,
        numero_pokemon : req.body.numero_pokemon,
        tipo_pokemon : req.body.tipo_pokemon,
        tipoSecundario_pokemon : req.body.tipoSecundario_pokemon,
        foto : req.body.foto
    });

    nuevoPokemon.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el pokémon, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El pokémon se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    pokemonModel.find().then(
        function(pokemon){
            res.send(pokemon);
        });
};
