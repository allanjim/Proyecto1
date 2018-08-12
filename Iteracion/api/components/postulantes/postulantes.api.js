'use strict';
const postulanteSchema = require('./postulantes.model');
const solicitudModel = require('../solicitud/solicitud.model');
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

module.exports.registrar_postulante = function (req, res) {

    let nuevoPostulante = new postulanteSchema({

        cedula_postulante: req.body.cedula_postulante,
        fecha_ingreso_postulante: req.body.fecha_ingreso_postulante,
        correo_postulante: req.body.correo_postulante,
        telefono_postulante: req.body.telefono_postulante,
        direccion_postulante: req.body.direccion_postulante,
        carrera_postulante: req.body.carrera_postulante
    });
    let idSolicitud = req.body.solicitud_id;

    nuevoPostulante.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el postulante, ocurrio el siguiente error ' + error });
        } else {
            solicitudModel.findOne({ "_id": idSolicitud }, function (error, solicitudDatos) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo encontrar la solicitud, ocurrio el siguiente error ' + error });
                }
                    mailOptions.to = nuevoPostulante.correo_postulante;
                    mailOptions.html = `
                    <html>   
                    <head>
                        <style>
                            h1{
                                background: #ff7675;
                                padding: 15px 0 15px 0;
                                text-align: center;
                            }
                        </style>
                    </head> 
                    <body>
                        <h1>Buen día ${solicitudDatos.nombre_solicitud} </h1>
                        <h2>Estado de la postulación:</h2>
                        <p>Le contactamos para informarle de su postulación para asistente del curso ${solicitudDatos.curso_solicitud}.</p>
                        <p>En este momento se encuentra el fase de revisión, en los próximos días se le informará de su estado 
                        final, por lo tanto estar atento al buzón de correos.</p>

                        <p>Muchas gracias, pase buen día.</p>
                    </body>
                    </html>  
                    `;
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json({ success: true, msg: 'El postulante se ha registro con exito' })
            });
        }
    });
};
module.exports.listar_postulante = function (req, res) {
    postulanteSchema.find().sort({ nombre_postulante: 'asc' }).then(
        function (postulantes) {
            res.send(postulantes);
        }
    );

};

module.exports.buscar_postulante_id = function (req, res) {
    postulanteSchema.findById({ _id: req.body._id }).then(
        function (postulante) {
            res.send(postulante);
        }
    );
};

module.exports.modificar_postulante = function (req, res) {
    postulanteSchema.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El postulante no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_postulante = function (req, res) {
    postulanteSchema.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El postulante no se ha podido eliminar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
