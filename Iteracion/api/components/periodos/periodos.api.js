'use strict';

let periodoModel = require('./periodos.model');

module.exports.registrar = function(req, res){
    let nuevoPeriodo = new periodoModel({
        nombre_periodo : req.body.nombre_periodo,
        estado_periodo : "Activo"
    });

    nuevoPeriodo.save(function(error){
        if (error){
            res.json({
                succes: false,
                msj: 'El periodo no pudo ser registrado: ' + error
            });
        
        }else{
            res.json({
                succes: true,
                msj: 'El periodo ha sido registrado con éxito'
            });
        }    
    });
};
module.exports.listar = function(req, res){
    periodoModel.find().sort({nombre_periodo: 'asc'}).then(
        function(periodos){
            res.send(periodos);
        });
};