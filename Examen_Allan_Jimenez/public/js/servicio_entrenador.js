'use strict';


function registrarEntrenador(plistaEntrenador){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_entrenador',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre_Entrenador : plistaEntrenador[0],
            numero_Entrenador : plistaEntrenador[1],
            edad_Entrenador : plistaEntrenador[2],
            sexo_Entrenador : plistaEntrenador[3],
            foto : plistaEntrenador [4]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
function obtenerListaEntrenador(){
    let listaEntrenador = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_entrenador',
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
    
    return listaEntrenador;
}