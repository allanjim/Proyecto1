'use strict';

const grupoModel = require ('./grupos.model');

module.exports.registrar = function(req, res){
    console.log(req.body);
    let nuevoGrupo = new grupoModel({
        curso_grupo : req.body.curso_grupo,
        laboratorio_grupo : req.body.laboratorio_grupo,
        profesor_grupo : req.body.profesor_grupo,
        cupo_grupo : req.body.cupo_grupo,
        horario_grupo : req.body.horario_grupo,
        lunes_grupo : req.body.lunes_grupo,
        martes_grupo : req.body.martes_grupo,
        miercoles_grupo : req.body.miercoles_grupo,
        jueves_grupo : req.body.jueves_grupo,
        viernes_grupo : req.body.viernes_grupo,
        sabado_grupo : req.body.sabado_grupo,

        
    })

    nuevoGrupo.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el grupo, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El grupo se registró con éxito'});
        }

    });

};


module.exports.listar_grupos = function (req, res)
{
    grupoModel.find().sort({ curso_grupo: 'asc' }).then(
        function (grupos)
        {
            res.send(grupos);
        }
    );
};