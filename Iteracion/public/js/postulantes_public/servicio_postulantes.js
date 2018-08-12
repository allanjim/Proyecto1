'use strict';

function registrarPostulante(paInfoSolicitud){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_postulante',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{

            cedula_postulante : paInfoSolicitud[0],
            correo_postulante : paInfoSolicitud[1],
            telefono_postulante : paInfoSolicitud[2],
            direccion_postulante : paInfoSolicitud[3],
            carrera_postulante : paInfoSolicitud[4],
            fecha_ingreso_postulante : paInfoSolicitud[5],
            solicitud_id : paInfoSolicitud [6]

        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function obtenerPostulante(){
    let listaPostulante = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_postulante',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaPostulante = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaPostulante;
};

function buscar_postulante_id(_pid){
    let postulante = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_postulante_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : _pid
        }
      });
    
      peticion.done(function(response){
        postulante = response;
      });
    
      peticion.fail(function(response){
       
      });

      return postulante;

};

function actualizarPostulante(paInfoSolicitud){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoSolicitud[0],
            cedula_postulante: paInfoSolicitud[1],
            fecha_ingreso_postulante: paInfoSolicitud[2],
            correo_postulante: paInfoSolicitud[3],
            telefono_postulante: paInfoSolicitud[4],
            direccion_postulante: paInfoSolicitud[5],
            carrera_postulante : paInfoSolicitud[6]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};