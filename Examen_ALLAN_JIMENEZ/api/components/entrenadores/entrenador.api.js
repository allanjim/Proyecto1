'use strict';
const entrenadorModel = require('./entrenador.model');
const pokemonModel = require('../pokemon/pokemon.model');

module.exports.registrar = function(req, res){
    let nuevoentrenador = new entrenadorModel({
        nombre_entrenador : req.body.nombre_entrenador,
        numero_entrenador : req.body.numero_entrenador,
        edad_entrenador : req.body.edad_entrenador,
        sexo_entrenador : req.body.sexo_entrenador,
        foto : req.body.foto
    });

    nuevoentrenador.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el entrenador, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El entrenador se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    entrenadorModel.find().then(
        function(entrenador){
            res.send(entrenador);
        });
};

module.exports.agregar_pokemon = function(req, res){
    pokemonModel.findOne({'_id': req.body.pokemon_id}).then(function(pokemon, error) {
        if (!pokemon || error) {
            res.json({success: false, msg: 'No existe el pokemon con id ' + req.body.pokemon_id});
        } else {
            console.log(pokemon);
            console.log(req.body);
            
            entrenadorModel.update(
                {_id: req.body._id}, 
            
                {$push: 
                    {'pokemon':
                        {
                            nombre_pokemon: pokemon.nombre_pokemon, 
                            numero_pokemon : pokemon.numero_pokemon
                        }
                    }
                },
                function(error) {
                    console.log('llego error', error);
                    if(error){
                        res.json({success : false, msg : 'No se pudo registrar el pokémon, ocurrió el siguiente error' + error});
                    }else{
                        res.json({success : true, msg : 'El pokémon se registró con éxito'});
                    }
                }
            )    
        }
    });
};
