<<<<<<< HEAD
'use strict';

mostrarPokemon();
cargarTipoPrimario();
cargarTipoSecundario();
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre_pokemon = document.querySelector('#txtNombre');
let inputNumero_pokemon = document.querySelector('#txtNumero');
let inputTipo_pokemon = document.querySelector('#txtPrimario');
let inputTipoSecundario_pokemon = document.querySelector('#txtSecundario');
let inputFiltro = document.querySelector('#txtFiltro');
inputFiltro.addEventListener('keyup', function(){

    mostrarPokemon(inputFiltro.value);
});

let sNombre_pokemon = '';
let sNumero_pokemon = '';
let sTipo_pokemon = '';
let sTipoSecundario_pokemon = '';

function obtenerDatos() {
    let bError = false;
    let aInfoPokemon = [];

    sNombre_pokemon = inputNombre_pokemon.value;
    sNumero_pokemon = inputNumero_pokemon.value;
    sTipo_pokemon = inputTipo_pokemon.value;
    sTipoSecundario_pokemon = inputTipoSecundario_pokemon.value;

    aInfoPokemon.push(sNombre_pokemon, sNumero_pokemon, sTipo_pokemon, sTipoSecundario_pokemon, imagenUrl);
    console.log(imagenUrl);
    bError = validarDatos();

    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el pokémon, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El pokémon se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        console.log(aInfoPokemon);
        console.log(imagenUrl);
        registrarPokemon(aInfoPokemon);
    }

};

function validarDatos() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('required');
    let tipo_pokemon = ['Fuego', 'Agua', 'Planta', 'Insecto', 'Dragón', 'Fantasma', 'Eléctrico', 'Lucha', 'Hada', 
    'Volador', 'Hielo', 'Roca', 'Normal', 'Hierro', 'Tierra', 'Veneno', 'Psiquico', 'Siniestro'];
    
    sNombre_pokemon = inputNombre_pokemon.value;
    sNumero_pokemon = inputNumero_pokemon.value;
    sTipo_pokemon = inputTipo_pokemon.value;
    sTipoSecundario_pokemon = inputTipoSecundario_pokemon.value;

    let regexSoloNumeros = /^[0-9]+$/;
    let regexSoloLetras = /^[a-zA-Z0-9-]+$/;
    let regexTipoSecundario = /^[- a-zA-Z]+$/;

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };
    if (regexSoloLetras.test(sNombre_pokemon) == false) {
        bError = true;
        inputNombre_pokemon.classList.add('errorInput');
    } else {
        inputNombre_pokemon.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sNumero_pokemon) == false) {
        bError = true;
        inputNumero_pokemon.classList.add('errorInput');
    } else {
        inputNumero_pokemon.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sTipo_pokemon) == false) {
        bError = true;
        inputTipo_pokemon.classList.add('errorInput');
    } else {
        inputTipo_pokemon.classList.remove('errorInput');
    }
    if (regexTipoSecundario.test(sTipoSecundario_pokemon) == false) {
        inputTipoSecundario_pokemon.classList.add('errorInput');
    } else {
        inputTipoSecundario_pokemon.classList.remove('errorInput');
    }

    return bError;
};

function cargarTipoPrimario() {
    let tipo_pokemon = ['Fuego', 'Agua', 'Planta', 'Insecto', 'Dragón', 'Fantasma', 'Eléctrico', 'Lucha', 'Hada', 
    'Volador', 'Hielo', 'Roca', 'Normal', 'Hierro', 'Tierra', 'Veneno', 'Psiquico', 'Siniestro'];
    let select = document.querySelector('#txtPrimario'); //Seleccionamos el select
    
    for(let i=0; i < tipo_pokemon.length; i++){ 
        let option = document.createElement('option'); //Creamos la opcion
        option.innerHTML = tipo_pokemon[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
};

function cargarTipoSecundario() {
    let tipo_pokemon = ['Fuego', 'Agua', 'Planta', 'Insecto', 'Dragón', 'Fantasma', 'Eléctrico', 'Lucha', 'Hada', 
    'Volador', 'Hielo', 'Roca', 'Normal', 'Hierro', 'Tierra', 'Veneno', 'Psiquico', 'Siniestro'];
    let select = document.querySelector('#txtSecundario'); //Seleccionamos el select
    
    for(let i=0; i < tipo_pokemon.length; i++){ 
        let option = document.createElement('option'); //Creamos la opcion
        option.innerHTML = tipo_pokemon[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
};

function mostrarPokemon(pFiltro) {
    let listaPokemon = obtenerListaPokemon();
    let tbody = document.querySelector('#tblPokemones tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i=0; i<listaPokemon.length;i++){
        if(listaPokemon[i]['nombre_pokemon'].toLowerCase().includes(pFiltro.toLowerCase()) || 
        listaPokemon[i]['tipo_pokemon'].toLowerCase().includes(pFiltro.toLowerCase())){

        let fila = tbody.insertRow();

        let cNombre_pokemon = fila.insertCell();
        let cNumero_pokemon = fila.insertCell();
        let cTipo_pokemon = fila.insertCell();
        let ctipoSecundario_pokemon = fila.insertCell();
        let cFoto = fila.insertCell();

        
        cNombre_pokemon.innerHTML = listaPokemon[i]['nombre_pokemon'];
        cNumero_pokemon.innerHTML = listaPokemon[i]['numero_pokemon'];
        cTipo_pokemon.innerHTML = listaPokemon[i]['tipo_pokemon'];
        ctipoSecundario_pokemon.innerHTML = listaPokemon[i]['tipoSecundario_pokemon'];
        
        let imagen = document.createElement('img');
        imagen.src = listaPokemon[i]['foto'];
        imagen.classList.add('imageSettings');

        cFoto.appendChild(imagen);


        }
    }

};
function limpiarFormulario() {

    inputNombre_pokemon.value = '';
    inputNumero_pokemon.value = '';
    inputTipo_pokemon.value = '';
    inputTipoSecundario_pokemon.value = '';
=======
'use strict';

mostrarPokemon();
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre_pokemon = document.querySelector('#txtNombre');
let inputNumero_pokemon = document.querySelector('#txtNumero');
let inputTipo_pokemon = document.querySelector('#txtPrimario');
let inputTipoSecundario_pokemon = document.querySelector('#txtSecundario');
let inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', function(){

    mostrarPokemon(inputFiltro.value);
});

let sNombre_pokemon = '';
let sNumero_pokemon = '';
let sTipo_pokemon = '';
let sTipoSecundario_pokemon = '';

function obtenerDatos() {
    let bError = false;
    let aInfoPokemon = [];

    sNombre_pokemon = inputNombre_pokemon.value;
    sNumero_pokemon = inputNumero_pokemon.value;
    sTipo_pokemon = inputTipo_pokemon.value;
    sTipoSecundario_pokemon = inputTipoSecundario_pokemon.value;

    aInfoPokemon.push(sNombre_pokemon, sNumero_pokemon, sTipo_pokemon, sTipoSecundario_pokemon, foto);

    bError = validarDatos();

    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el pokémon, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El pokémon se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        console.log(aInfoPokemon);
        registrarPokemon(aInfoPokemon);
    }

};

function validarDatos() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('required');

    sNombre_pokemon = inputNombre_pokemon.value;
    sNumero_pokemon = inputNumero_pokemon.value;
    sTipo_pokemon = inputTipo_pokemon.value;
    sTipoSecundario_pokemon = inputTipoSecundario_pokemon.value;

    let regexSoloNumeros = /^[0-9]+$/;
    let regexSoloLetras = /^[a-zA-Z0-9-]+$/;
    let regexTipoSecundario = /^[- a-zA-Z]+$/;

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };
    if (regexSoloLetras.test(sNombre_pokemon) == false) {
        bError = true;
        inputNombre_pokemon.classList.add('errorInput');
    } else {
        inputNombre_pokemon.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sNumero_pokemon) == false) {
        bError = true;
        inputNumero_pokemon.classList.add('errorInput');
    } else {
        inputNumero_pokemon.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sTipo_pokemon) == false) {
        bError = true;
        inputTipo_pokemon.classList.add('errorInput');
    } else {
        inputTipo_pokemon.classList.remove('errorInput');
    }
    if (regexTipoSecundario.test(sTipoSecundario_pokemon) == false) {
        inputTipoSecundario_pokemon.classList.add('errorInput');
    } else {
        inputTipoSecundario_pokemon.classList.remove('errorInput');
    }

    return bError;
};


function mostrarPokemon(pFiltro) {
    let listaPokemon = obtenerListaPokemon();
    let tbody = document.querySelector('#tblPokemones tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i=0; i<listaPokemon.length;i++){
        if(listaPokemon[i]['nombre_pokemon'].toLowerCase().includes(pFiltro.toLowerCase()) || 
        listaPokemon[i]['tipo_pokemon'].toLowerCase().includes(pFiltro.toLowerCase())){

        let fila = tbody.insertRow();
    
        let cNombre_pokemon = fila.insertCell();
        let cNumero_pokemon = fila.insertCell();
        let cTipo_pokemon = fila.insertCell();
        let ctipoSecundario_pokemon = fila.insertCell();
        let cFoto = fila.insertCell();



        cNombre_pokemon.innerHTML = listaPokemon[i]['nombre_pokemon'];
        cNumero_pokemon.innerHTML = listaPokemon[i]['numero_pokemon'];
        cTipo_pokemon.innerHTML = listaPokemon[i]['tipo_pokemon'];
        ctipoSecundario_pokemon.innerHTML = listaPokemon[i]['tipoSecundario_pokemon'];

        let imagen = document.createElement('img');
        imagen.src = listaPokemon[i]['foto'];
        imagen.classList.add('imageSettings');

        cFoto.appendChild(imagen);

        }
    }

};
function limpiarFormulario() {

    inputNombre_pokemon.value = '';
    inputNumero_pokemon.value = '';
    inputTipo_pokemon.value = '';
    inputTipoSecundario_pokemon.value = '';
>>>>>>> parent of fee5c8f... Cambio en el front end y interfaz de las páginas
};