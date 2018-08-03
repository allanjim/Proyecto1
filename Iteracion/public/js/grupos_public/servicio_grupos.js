'use strict';

function registrarGrupo(paInfoGrupo){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_grupos',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            curso_grupo : paInfoGrupo[0],
            laboratorio_grupo : paInfoGrupo[1],
            profesor_grupo : paInfoGrupo[2],
            cupo_grupo : paInfoGrupo[3],
            horario_grupo : paInfoGrupo[4],  
            lunes_grupo : paInfoGrupo[5], 
            martes_grupo : paInfoGrupo[6],
            miercoles_grupo : paInfoGrupo[7],
            jueves_grupo : paInfoGrupo[8],
            viernes_grupo : paInfoGrupo[9],
            sabado_grupo : paInfoGrupo[10]      
        }
    });
    
    peticion.done(function(response){
        respuesta = response;
       });
     
       peticion.fail(function(response){
        
       });
 
       return respuesta;
 }

 function obtenerListaGrupos(){    
    let listaGrupos = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_grupos',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return listaGrupos;
}