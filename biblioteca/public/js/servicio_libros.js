'use strict';

function registrarLibro(pTitulo, pEditorial, pPrecio){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_libro',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           titulo : pTitulo,
           editorial : pEditorial,
           precio : pPrecio
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function obtenerLibros(){
    let listaLibros = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_libros',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaLibros = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaLibros;
};

function obtener_libro_por_id(pid){
  let libro = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/buscar_libro_id',
      type : 'post',
      contentType : 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async : false,
      data:{
          _id : pid
      }
    });
  
    peticion.done(function(response){
      libro = response;
    });
  
    peticion.fail(function(response){
     
    });

    return libro;
};

function actualizarLibro(_pid, pTitulo, pEditorial, pPrecio){
  let respuesta = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/modificar_libros',
      type : 'post',
      contentType : 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async : false,
      data:{
          _id: _pid,
          titulo : pTitulo,
          editorial : pEditorial,
          precio : pPrecio
      }
    });
  
    peticion.done(function(response){
     respuesta = response;
    });
  
    peticion.fail(function(response){
     
    });
    return respuesta;
}