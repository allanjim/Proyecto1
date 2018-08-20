'use strict';

function registrar_usuarios(paInfoUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_usuarios',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            foto_usuario: paInfoUsuario[0],
            primer_nombre_usuario: paInfoUsuario[1],
            segundo_nombre_usuario: paInfoUsuario[2],
            primer_apellido_usuario: paInfoUsuario[3],
            segundo_apellido_usuario: paInfoUsuario[4],
            cedula_usuario: paInfoUsuario[5],
            fechaNacimiento_usuario: paInfoUsuario[6],
            sexo_usuario : paInfoUsuario[7],
            correo_usuario: paInfoUsuario[8],
            rol_usuario : paInfoUsuario[9],
            contrasenna_usuario: paInfoUsuario[10],
            contrasennaConfirmacion_usuario: paInfoUsuario[11]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtener_usuarios() {
    let listaUsuarios = [];

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaUsuarios = response;
    });

    peticion.fail(function (response) {

    });

    return listaUsuarios;
};

function buscar_usuario_por_id(pid) {
    let usuario = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_usuario_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        usuario = response;
    });

    peticion.fail(function (response) {

    });

    return usuario;
};

function actualizarUsuario(paInfoUsuarioActual) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id : paInfoUsuarioActual[0],
            foto_usuario: paInfoUsuarioActual[1],
            primer_nombre_usuario: paInfoUsuarioActual[2],
            segundo_nombre_usuario: paInfoUsuarioActual[3],
            primer_apellido_usuario: paInfoUsuarioActual[4],
            segundo_apellido_usuario: paInfoUsuarioActual[5],
            fechaNacimiento_usuario: paInfoUsuarioActual[6],
            sexo_usuario : paInfoUsuarioActual[7],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function eliminarUsuario(_pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: _pid
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};