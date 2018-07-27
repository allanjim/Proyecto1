'use strict';
const publisherModel = require('./publishers.model');

module.exports.registrar = function(req, res) {
   
    let nuevaEditorial = new publisherModel({
        nombre : req.body.nombre,
        pais : req.body.pais
    });

    nuevaEditorial.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar la editorial, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'La editorial se registró con éxito'}); 
        }
    });
};
module.exports.listar_todos = function(req , res){
    publisherModel.find().sort({nombre: 'asc'}).then(
        function(editoriales){
            res.send(editoriales);
        }
    );

};