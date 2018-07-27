'use strict';
mostrarListaLibros();
mostrarEditoriales();
let listaLibros = obtenerLibros();
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputTitulo = document.querySelector('#txtTitulo');
let selectEditorial = document.querySelector('#txtEditorial');
let inputPrecio = document.querySelector('#txtPrecio');
let inputId = document.querySelector('#txtId');

let botonActualizar = document.querySelector('#btnActualizar');

botonActualizar.hidden = true;

botonRegistrar.addEventListener('click' , obtenerDatos);
botonActualizar.addEventListener('click' , obtenerLibrosActualizar);

botonRegistrar.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
    let bError = false;
    let sTitulo = inputTitulo.value;
    let sEditorial = selectEditorial.value;
    let nPrecio = Number(inputPrecio.value);

    //bError = validar();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el usuario, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarLibro(sTitulo , sEditorial, nPrecio);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
              });
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
        mostrarListaLibros();  
    }
  
};

function mostrarListaLibros(){
    let listaLibros = obtenerLibros();
    let tbody = document.querySelector('#tblLibros tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaLibros.length; i++){
        let fila = tbody.insertRow();

        let celdaTitulo = fila.insertCell();
        let celdaEditorial = fila.insertCell();
        let celdaPrecio = fila.insertCell();
        let cConfiguracion = fila.insertCell();

        celdaTitulo.innerHTML = listaLibros[i]['titulo'];
        celdaEditorial.innerHTML = listaLibros[i]['editorial'];
        celdaPrecio.innerHTML = listaLibros[i]['precio'];

        let botonModificar = document.createElement('a');
        botonModificar.classList.add('fas');
        botonModificar.classList.add('fa-pencil-alt');

        botonModificar.dataset._id = listaLibros[i]['_id'];

        botonModificar.addEventListener('click', buscar_por_id);

        cConfiguracion.appendChild(botonModificar);
 
    }
};

function mostrarEditoriales(){
    let listaEditoriales = listar_editoriales();
    let selectEditorial = document.querySelector('#lstEditorial');
    for(let i=0; i < listaEditoriales.length; i++){
        let nuevaOpcion = new Option(listaEditoriales[i]['nombre']);
        nuevaOpcion.value = listaEditoriales[i]['nombre'];
        selectEditorial.appendChild(nuevaOpcion);
    }
};

function buscar_por_id(){

    let _id = this.dataset._id;
    //Instruccion que sirve para ocultar un boton
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let listaLibros = obtener_libro_por_id(_id);

    inputTitulo.value = listaLibros['titulo'];
    selectEditorial.value = listaLibros['editorial'];
    inputPrecio.value = listaLibros['precio'];
};

function obtenerLibrosActualizar(){
    let bError = false;

    let sTitulo = inputTitulo.value;
    let sEditorial = selectEditorial.value;
    let nPrecio = Number(inputPrecio.value);  
    let _id = inputId.value;
    
    //bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo actualizar el libro',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        });
        console.log('No se pudo actualizar el usuario');
    }else{
        actualizarLibro(_id, sTitulo, sEditorial, nPrecio);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText : 'Entendido'
        });
        listaLibros = obtenerLibros();
        mostrarListaLibros();
        limpiarFormulario();
    }

};

function limpiarFormulario(){
    inputTitulo.value = '';
    inputPrecio.value = '';
    selectEditorial.value = '';

};