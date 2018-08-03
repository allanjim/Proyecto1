'use strict';


function registrarPeriodo(paInfoPeriodo) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_periodos',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_periodo: paInfoPeriodo[0],
            estado_periodo: paInfoPeriodo[1]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta
};


function obtenerListaPeriodos() {
    let listaPeriodos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_periodos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaPeriodos = response;
    });

    peticion.fail(function (response) {
        return response;
    });
    return listaPeriodos;

}
