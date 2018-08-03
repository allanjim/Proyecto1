'use strict';

const solicitudModel = require('./solicitud.model');

module.exports.registrar = function(req, res) {
   
    let nuevoSolicitud = new solicitudModel({
        
       profesor_solicitud : req.body.profesor_solicitud,
       carrera_solicitud : req.body.profesor_solicitud,
       curso_solicitud : req.body.curso_solicitud,
       periodo_solicitud : req.body.periodo_solicitud,
       grupo_solicitud : req.body.grupo_solicitud,
       nombre_solicitud : req.body.nombre_solicitud,
       estado_solicitud : req.body.estado_solicitud
    });

    nuevoSolicitud.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar la solicitud, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'La solicitud se registró con éxito'}); 
        }
    });
};
module.exports.listar = function(req , res){
    solicitudModel.find().sort({titulo: 'asc'}).then(
        function(solicitudes){
            res.send(solicitudes);
        }
    );

};

module.exports.buscar_solicitud_por_id = function (req, res) {
    solicitudModel.findById({ _id: req.body._id }).then(
        function (solicitud) {
            res.send(solicitud);
        }
    );
};

module.exports.modificar_solicitud = function (req, res) {
    solicitudModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La solicitud no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_solicitud = function (req, res) {
    solicitudModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La solicitud no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};