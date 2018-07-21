<<<<<<< HEAD
'use strict';
const entrenadorModel = require('./entrenador.model');

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
=======
'use strict';
const entrenadorModel = require('./entrenador.model');

//Función para registrar un usuario
module.exports.registrar = function(req, res){
    //Crea una variable nuevoUsuario utilizando como plantilla el userModel
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
>>>>>>> parent of fee5c8f... Cambio en el front end y interfaz de las páginas
