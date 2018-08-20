'use strict';
const hotelModel = require('./hotel.model');

module.exports.registrar_hoteles = function (req, res) {

    let nuevoHotel = new hotelModel({
        nombre_hotel: req.body.nombre_hotel,
        latitud_hotel: req.body.latitud_hotel,
        longitud_hotel: req.body.longitud_hotel,
        provincia_hotel: req.body.provincia_hotel,
        canton_hotel: req.body.canton_hotel,
        distrito_hotel: req.body.distrito_hotel,
        direccion_hotel: req.body.direccion_hotel,
        correo_servicio_cliente: req.body.correo_servicio_cliente,
        telefono_servicio_cliente: req.body.telefono_servicio_cliente,
        correo_reservaciones: req.body.correo_reservaciones,
        telefono_reservaciones: req.body.telefono_reservaciones,
        estado_hotel: req.body.estado_hotel
    });

    nuevoHotel.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el hotel, ocurrio el siguiente error ' + error });
        } else {
            res.json({ success: true, msg: 'usted se ha registro con exito' })
        }

    });
};
module.exports.listar_hoteles = function (req, res) {
    hotelModel.find().sort({ nombre_hotel: 'asc' }).then(
        function (hoteles) {
            res.send(hoteles);
        }
    );

};

module.exports.buscar_hotel_por_id = function (req, res) {
    hotelModel.findById({ _id: req.body._id }).then(
        function (hotel) {
            res.send(hotel);
        }
    );
};

module.exports.modificar_hotel = function (req, res) {
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El hotel no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};


module.exports.eliminar_hotel = function (req, res) {
    hotelModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El hotel no se ha podido eliminar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
module.exports.evaluar_hotel = function (req, res) {
    let suma = 0;
    let promedio = 0;
    // 1. recibe evaluacion en req.evaluaciones(cada numero es una categoria):
    // [5, 4, 5, 5]
    
    // 2. saca promedio sumando evalacuones y divide entre cantidad de categorias
    req.evalaciones.forEach(function(evalCategoria) {
        suma += evalCategoria;
    });
    promedio = suma / req.evaluaciones.length;

    hotelModel.findById(req.body._id, (err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'No se encontro el hotel evaluado. Error: ' + err });
            
        } else {
            // 3. numEvaluaciones++;
            // 4. sumEvaluaciones += promedio del punto 2
            // 5. ranking = sumEvaluaciones/numEvaluaciones;
            hotel.numEvaluaciones++;
            hotel.sumEvaluaciones += promedio;
            hotel.ranking = hotel.sumEvaluaciones / hotel.numEvaluaciones;
            // 6. guarda en mongo
            hotel.save(function(err) {
                if (err) {
                    res.json({ success: false, msg: 'No se ha guardado la evaluacion del hotel correctamente. ' + err });
                } else {
                    res.json({ success: true, msg: 'Se ha evaluado el hotel correctamente. '});
                }
            });
        }
    });
};

module.exports.listar_ranking_hoteles = function (req, res) {
    hotelModel.find().sort({ ranking: 'asc' }).then(
        function (hoteles) {
            res.send(hoteles);
        }
    );
}