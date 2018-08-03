'use strict';

const LaboratorioModel = require ('./laboratorios.model');

module.exports.registrar_laboratorio = function(req, res){
    console.log(req.body);
    let nuevoLaboratorio = new LaboratorioModel ({
        nombre_laboratorio : req.body.nombre_laboratorio,
        codigo_laboratorio : req.body.codigo_laboratorio,  
        cupo_laboratorio : req.body.cupo_laboratorio,
        sede_laboratorio : req.body.sede_laboratorio
    })

    nuevoLaboratorio.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el laboratorio, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El laboratorio se registró con éxito'});
        }

    });

};

module.exports.listar_laboratorio = function (req, res)
{
    LaboratorioModel.find().sort({ nombre_laboratorio: 'asc' }).then(
        function (laboratorios)
        {
            res.send(laboratorios);
        }
    );
};
