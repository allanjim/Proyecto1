'use strict';
const userModel = require('./user.model');
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
    subject: 'Registro exitoso',
    html: ''
};
module.exports.registrar_usuarios = function (req, res)
{

    let nuevoUsuario = new userModel({
        foto_usuario: req.body.foto_usuario,
        primer_nombre_usuario: req.body.primer_nombre_usuario,
        segundo_nombre_usuario: req.body.segundo_nombre_usuario,
        primer_apellido_usuario: req.body.primer_apellido_usuario,
        segundo_apellido_usuario: req.body.segundo_apellido_usuario,
        cedula_usuario: req.body.cedula_usuario,
        fechaNacimiento_usuario: req.body.fechaNacimiento_usuario,
        sexo_usuario : req.body.sexo_usuario,
        correo_usuario: req.body.correo_usuario,
        rol_usuario: 'Administrador',
        contrasenna_usuario: req.body.contrasenna_usuario,
        contrasennaConfirmacion_usuario: req.body.contrasennaConfirmacion_usuario
    });

    nuevoUsuario.save(function (error)
    {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar su usuario, ocurrio el siguiente error ' + error });
        } else {
            mailOptions.to = req.body.correo_usuario;
                            mailOptions.html = `
                            <html>   
                            <head>
                                <style>
                                    h1{
                                        padding: 15px 0 15px 0;
                                        text-align: center;
                                    }
                                </style>
                                <style>
                                    html{
                                        background-color : rgba(77,84,170, 0.7);
                                        color : #ffffff;
                                        padding: 15px 0 15px 0;
                                    }
                                </style>
                            </head> 
                            <body>
                                <h1>Buen día ${req.body.primer_nombre_usuario + ' ' + req.body.primer_apellido_usuario + ' ' + req.body.segundo_apellido_usuario} </h1>
                                <p>Le contactamos para informarle que su registro fue exitoso, por lo que 
                                brindaremos su datos para su respectivo inicio de sesión.</p>
                                <p>Correo del usuario : ${ req.body.correo_usuario} .</p>
        
                                <p>Por favor verifique que los datos sean correctos.</p>
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
            res.json({ success: true, msg: 'El usuario se ha registrado con éxito' })
        }

    });
};
module.exports.listar_usuarios = function (req ,res)
{
    userModel.find().sort({ nombre_usuario: 'asc' }).then(
        function (usuarios)
        {
            res.send(usuarios);
        }
    );

};

module.exports.buscar_usuario_por_id = function (req, res) {
    userModel.findById({ _id: req.body._id }).then(
        function (usuario) {
            res.send(usuario);
        }
    );
};

module.exports.modificar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, usuario) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};


module.exports.eliminar_usuario = function (req, res) {
    userModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido eliminar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
