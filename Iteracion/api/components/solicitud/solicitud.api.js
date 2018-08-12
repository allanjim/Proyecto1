'use strict';

const solicitudModel = require('./solicitud.model');
const postulanteModel = require('../postulantes/postulantes.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'standasama@gmail.com',
        pass: 'cenfotec01'
    }
});


let mailOptions = {
    from: 'standasama@gmail.com',
    to: '',
    subject: 'Bienvenido a la universidad Cenfotec',
    html: ''
};

module.exports.registrar = function (req, res) {

    let nuevoSolicitud = new solicitudModel({

        profesor_solicitud: req.body.profesor_solicitud,
        carrera_solicitud: req.body.carrera_solicitud,
        curso_solicitud: req.body.curso_solicitud,
        periodo_solicitud: req.body.periodo_solicitud,
        nombre_solicitud: req.body.nombre_solicitud,
        estado_solicitud: req.body.estado_solicitud
    });

    let idPostulante = req.body.postulante_id;

    nuevoSolicitud.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la solicitud, ocurrio el siguiente error ' + error });
        } else {
            // postulanteModel.findOne({ "_id": idPostulante }, function (error, postulanteDatos) {
            //     if (error) {
            //         res.json({ success: false, msg: 'No se pudo encontrar la solicitud, ocurrio el siguiente error ' + error });
            //     }
            //         mailOptions.to = postulanteDatos.correo_postulante;
            //         mailOptions.html = `
            //         <html>   
            //         <head>
            //             <style>
            //                 h1{
            //                     background: #ff7675;
            //                     padding: 15px 0 15px 0;
            //                     text-align: center;
            //                 }
            //             </style>
            //         </head> 
            //         <body>
            //             <h1>Buen día ${req.body.solicitud} </h1>
            //             <h2>Estado de la postulación:</h2>
            //             <p>Le contactamos para informarle de su postulación para asistente del curso ${req.body.curso_solicitud} con 
            //             el profesor ${req.body.profesor_solicitud}.</p>
            //             <p>En este momento su postulación fue reprobada.</p>

            //             <p>Muchas gracias, pase buen día.</p>
            //         </body>
            //         </html>  
            //         `;
            //         transporter.sendMail(mailOptions, function (error, info) {
            //             if (error) {
            //                 console.log(error);
            //             } else {
            //                 console.log('Email sent: ' + info.response);
            //             }
            //         });
                    res.json({ success: true, msg: 'La solicitud se ha registro con exito' })
            // });
        }
    });
};

module.exports.listar = function (req, res) {
    solicitudModel.find().sort({ nombre_solicitud: 'asc' }).then(
        function (solicitudes) {
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