'use strict';

mostrarEntrenador();
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre_entrenador = document.querySelector('#txtNombre');
let inputNumero_entrenador = document.querySelector('#txtNumero');
let inputEdad_entrenador = document.querySelector('#txtEdad');
let inputSexo_entrenador = document.querySelector('#sltSexo');
let inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', function(){

    mostrarEntrenador(inputFiltro.value);
});

let sNombre_entrenador = '';
let sNumero_entrenador = '';
let nEdad_entrenador = '';
let sSexo_entrenador = '';

function obtenerDatos() {
    let bError = false;
    let aInfoEntrenador = [];

    sNombre_entrenador = inputNombre_entrenador.value;
    sNumero_entrenador = inputNumero_entrenador.value;
    nEdad_entrenador = inputEdad_entrenador.value;
    sSexo_entrenador = inputSexo_entrenador.value;

    aInfoEntrenador.push(sNombre_entrenador, sNumero_entrenador, nEdad_entrenador, sSexo_entrenador, imagenUrl);

    bError = validarDatos();

    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el entrenador, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El entrenador se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        registrarEntrenador(aInfoEntrenador);
        limpiarFormulario();
    }

};

function validarDatos() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('required');
    let listaEntrenador = obtenerListaEntrenador(); 

    sNombre_entrenador = inputNombre_entrenador.value;
    sNumero_entrenador = inputNumero_entrenador.value;
    nEdad_entrenador = inputEdad_entrenador.value;
    sSexo_entrenador = inputSexo_entrenador.value;

    let regexSoloNumeros = /^[0-9]+$/;
    let regexSoloLetras = /^[a-zA-Z0-9-]+$/;

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }

    };

   for(let i=0; i<listaEntrenador.length;i++){
        if(sNumero_entrenador == listaEntrenador[i]['numero_entrenador']){
            bError = true;
            inputNumero_entrenador.classList.add('errorInput');
    }else{
        inputNumero_entrenador.classList.remove('errorInput');
    }

    };

    if (regexSoloLetras.test(sNombre_entrenador) == false) {
        bError = true;
        inputNombre_entrenador.classList.add('errorInput');
    } else {
        inputNombre_entrenador.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sNumero_entrenador) == false) {
        bError = true;
        inputNumero_entrenador.classList.add('errorInput');
    } else {
        inputNumero_entrenador.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(nEdad_entrenador) == false || nEdad_entrenador <15 || nEdad_entrenador > 80) {
        bError = true;
        inputEdad_entrenador.classList.add('errorInput');
    } else {
        inputEdad_entrenador.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sSexo_entrenador) == false) {
        inputSexo_entrenador.classList.add('errorInput');
    } else {
        inputSexo_entrenador.classList.remove('errorInput');
    }

    return bError;
};


function mostrarEntrenador(pFiltro) {
    let listaEntrenador = obtenerListaEntrenador();
    let tbody = document.querySelector('#tblEntrenadores tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i=0; i<listaEntrenador.length;i++){
        if(listaEntrenador[i]['nombre_entrenador'].toLowerCase().includes(pFiltro.toLowerCase())){

        let fila = tbody.insertRow();
    
        let cNombre_entrenador = fila.insertCell();
        let cNumero_entrenador = fila.insertCell();
        let cEdad_entrenador = fila.insertCell();
        let cSexo_entrenador = fila.insertCell();
        let cFoto = fila.insertCell();



        cNombre_entrenador.innerHTML = listaEntrenador[i]['nombre_entrenador'];
        cNumero_entrenador.innerHTML = listaEntrenador[i]['numero_entrenador'];
        cEdad_entrenador.innerHTML = listaEntrenador[i]['edad_entrenador'];
        cSexo_entrenador.innerHTML = listaEntrenador[i]['sexo_entrenador'];

        let imagen = document.createElement('img');
        imagen.src = listaEntrenador[i]['foto'];
        imagen.classList.add('imageSettings');

        cFoto.appendChild(imagen);
        }
    }

};

function limpiarFormulario() {

    inputNombre_entrenador.value = '';
    inputNumero_entrenador.value = '';
    inputEdad_entrenador.value = '';
    inputSexo_entrenador.value = '';
};