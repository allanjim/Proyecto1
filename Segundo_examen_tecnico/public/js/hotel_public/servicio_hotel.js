'use strict';

function registrar_hotel(paInfoHotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_hotel: paInfoHotel [0],
            latitud_hotel : paInfoHotel[1],
            longitud_hotel : paInfoHotel[2],
            provincia_hotel: paInfoHotel[3],
            canton_hotel: paInfoHotel[4],
            distrito_hotel: paInfoHotel[5],
            direccion_hotel: paInfoHotel[6],
            correo_servicio_cliente : paInfoHotel[7],
            telefono_servicio_cliente  : paInfoHotel[8],
            correo_reservaciones : paInfoHotel[9],
            telefono_reservaciones : paInfoHotel[10],
            estado_hotel : paInfoHotel[11]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtener_hoteles() {
    let listaHoteles = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_hoteles',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function buscar_hotel_por_id(pid) {
    let hotel = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_hotel_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        hotel = response;
    });

    peticion.fail(function (response) {

    });

    return hotel;
};

function actualizarHotel(paInfoHotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id : paInfoHotel[0],
            nombre_hotel: paInfoHotel [1],
            latitud_hotel : paInfoHotel[2],
            longitud_hotel : paInfoHotel[3],
            provincia_hotel: paInfoHotel[4],
            canton_hotel: paInfoHotel[5],
            distrito_hotel: paInfoHotel[6],
            direccion_hotel: paInfoHotel[7],
            correo_servicio_cliente : paInfoHotel[8],
            telefono_servicio_cliente  : paInfoHotel[9],
            correo_reservaciones : paInfoHotel[10],
            telefono_reservaciones : paInfoHotel[11],
            estado_hotel : paInfoHotel[12]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function eliminar_hotel(_pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_hotel',
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