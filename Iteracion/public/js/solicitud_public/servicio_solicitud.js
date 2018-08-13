'use strict';

function registrarSolicitud(paInfoSolicitud){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_solicitud',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{

            profesor_solicitud : paInfoSolicitud[0],
            carrera_solicitud : paInfoSolicitud[1],
            curso_solicitud : paInfoSolicitud[2],
            periodo_solicitud : paInfoSolicitud[3],
            nombre_solicitud : paInfoSolicitud[4],
            estado_solicitud : paInfoSolicitud[5]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function obtenerSolicitud(){
    let listaSolicitud = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_solicitud',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaSolicitud = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaSolicitud;
};

function buscar_solicitud_id(_pid){
    let solicitud = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_solicitud_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : _pid
        }
      });
    
      peticion.done(function(response){
        solicitud = response;
      });
    
      peticion.fail(function(response){
       
      });

      return solicitud;

};

function actualizarSolicitud (paInfoSolicitud){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoSolicitud[0],
            profesor_solicitud : paInfoSolicitud[1],
            carrera_solicitud : paInfoSolicitud[2],
            curso_solicitud : paInfoSolicitud[3],
            periodo_solicitud : paInfoSolicitud[4],
            nombre_solicitud : paInfoSolicitud[5],
            estado_solicitud : paInfoSolicitud[6]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};

function eliminarSolicitud (_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: _pid
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;

};