'use strict';

mostrarListahoteles();

let listaHotel = obtener_hoteles();
let popup;
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

const inputNombre = document.querySelector('#txtNombre_hotel');
const inputLatitud = document.querySelector('#txtLatitud_hotel');
const inputLongitud = document.querySelector('#txtLongitud_hotel');
const inputDireccion = document.querySelector('#txtDireccion_hotel');
const inputProvincia = document.querySelector('#sltProvincia');
const inputCanton = document.querySelector('#sltCanton');
const inputDistrito = document.querySelector('#sltDistrito');
const inputCorreo_cliente = document.querySelector('#txtCorreo_servicioCliente');
const inputTelefono_cliente = document.querySelector('#txtTelefono_servicioCliente');
const inputCorreo_reservacion = document.querySelector('#txtCorreo_reservaciones');
const inputTelefono_reservacion = document.querySelector('#txtTelefono_reservaciones');
const selectEstado = document.querySelector('#sltEstado');
const inputIdHotel = document.querySelector('#IdHotel');

let botonActualizar = document.querySelector('#btn_Actualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);
botonActualizar.hidden = true;

let botonRegistrar = document.querySelector('#btn_Registrar');
botonRegistrar.addEventListener('click', obtenerDatosHoteles);

let inputBuscar = document.querySelector('#txtBusqueda');
inputBuscar.addEventListener('keyup', function () {

    mostrarListahoteles(inputBuscar.value);

});

let sIdHotel = '';
let sNombre = '';
let sLatitud = '';
let sLongitud = '';
let sDireccion = '';
let sProvincia = '';
let sCanton = '';
let sDistrito = '';
let sCorreo_cliente = '';
let sTelefono_cliente = '';
let sCorreo_reservacion = '';
let sTelefono_reservacion = '';
let sEstado = '';

function obtenerDatosHoteles() {
    let bError = false;

    let ainfoHoteles = [];

    sNombre = inputNombre.value;
    sLatitud = inputLatitud.value;
    sLongitud = inputLongitud.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sCorreo_cliente = inputCorreo_cliente.value;
    sTelefono_cliente = inputTelefono_cliente.value;
    sCorreo_reservacion = inputCorreo_reservacion.value;
    sTelefono_reservacion = inputTelefono_reservacion.value;
    sEstado = selectEstado.value;

    ainfoHoteles.push(sNombre, sLatitud, sLongitud, sProvincia, sCanton, sDistrito, sDireccion, sCorreo_cliente, sTelefono_cliente,
        sCorreo_reservacion, sTelefono_reservacion, sEstado);

    bError = validarHoteles();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el hotel, verifique que los espacios marcados en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido!'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El hotel se registro correctamente',
            type: 'success',
            confirmButtonText: 'Entendido!'
        });
        registrar_hotel(ainfoHoteles);
        mostrarListahoteles();
        limpiarFormulario();
    }

};

function validarHoteles() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('input:required');
    let regexSoloLetras = /^[a-z A-ZñÑáéíóúÁÉÍÓÚ]+$/;
    let regexSoloNumero = /^[0-9.-]+$/;
    let regexCoordenadas = /^[0-9.-]+$/;
    let regexCorreo = /^[a-zA-Z0-9._]+@gmail.com+$/;

    sNombre = inputNombre.value;

    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sCorreo_cliente = inputCorreo_cliente.value;
    sTelefono_cliente = inputTelefono_cliente.value;
    sCorreo_reservacion = inputCorreo_reservacion.value;
    sTelefono_reservacion = inputTelefono_reservacion.value;
    sEstado = selectEstado.value

    for (let i = 0; i < arregloInputs; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };
    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    }
    if (regexCoordenadas.test(sLatitud) == false) {
        bError = true;
        inputLatitud.classList.add('errorInput');
    } else {
        inputLongitud.classList.remove('errorInput');
    }
    if (regexCoordenadas.test(sLongitud) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sDireccion) == false) {
        bError = true;
        inputDireccion.classList.add('errorInput');
    } else {
        inputDireccion.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sProvincia) == false) {
        bError = true;
        inputProvincia.classList.add('errorInput');
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sCanton) == false) {
        bError = true;
        inputCanton.classList.add('errorInput');
    } else {
        inputCanton.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sDistrito) == false) {
        bError = true;
        inputDistrito.classList.add('errorInput');
    } else {
        inputDistrito.classList.remove('errorInput');
    }
    if (regexCorreo.test(sCorreo_cliente) == false) {
        bError = true;
        inputCorreo_cliente.classList.add('errorInput');
    } else {
        inputCorreo_cliente.classList.remove('errorInput');
    }
    if (regexSoloNumero.test(sTelefono_cliente) == false) {
        bError = true;
        inputTelefono_cliente.classList.add('errorInput');
    } else {
        inputTelefono_cliente.classList.remove('errorInput');
    }
    if (regexCorreo.test(sCorreo_reservacion) == false) {
        bError = true;
        inputCorreo_reservacion.classList.add('errorInput');
    } else {
        inputCorreo_reservacion.classList.remove('errorInput');
    }
    if (regexSoloNumero.test(sTelefono_reservacion) == false) {
        bError = true;
        inputTelefono_reservacion.classList.add('errorInput');
    } else {
        inputTelefono_reservacion.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sEstado) == false) {
        bError = true;
        selectEstado.classList.add('errorInput');
    } else {
        selectEstado.classList.remove('errorInput');
    }
    return bError;
};

function obtenerDatosActualizar() {
    let bError = false;

    let ainfoHoteles = [];

    sNombre = inputNombre.value;
    sLatitud = inputLatitud.value;
    sLongitud = inputLongitud.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sCorreo_cliente = inputCorreo_cliente.value;
    sTelefono_cliente = inputTelefono_cliente.value;
    sCorreo_reservacion = inputCorreo_reservacion.value;
    sTelefono_reservacion = inputTelefono_reservacion.value;
    sEstado = selectEstado.value;
    sIdHotel = inputIdHotel.value;

    ainfoHoteles.push(sIdHotel, sNombre, sLatitud, sLongitud, sProvincia, sCanton, sDistrito, sDireccion, sCorreo_cliente, sTelefono_cliente,
        sCorreo_reservacion, sTelefono_reservacion, sEstado);

    bError = validarHoteles();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el hotel, verifique que los espacios marcados en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido!'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El hotel se registro correctamente',
            type: 'success',
            confirmButtonText: 'Entendido!'
        });
        actualizarHotel(ainfoHoteles);
        mostrarListahoteles();
        limpiarFormulario();
    }

};

function mostrarListahoteles(paBuscar) {
    let listaHotel = obtener_hoteles();
    let tbody = document.querySelector('#tblHoteles tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaHotel.length; i++) {
        if (listaHotel[i]['nombre_hotel'].toLowerCase().includes(paBuscar.toLowerCase()) || listaHotel[i]['provincia_hotel'].toLowerCase().includes(paBuscar.toLowerCase())
            || listaHotel[i]['canton_hotel'].toLowerCase().includes(paBuscar.toLowerCase()) || listaHotel[i]['distrito_hotel'].toLowerCase().includes(paBuscar.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaNombre = fila.insertCell();
            let celdaDireccion = fila.insertCell();
            let celdaCorreo_scliente = fila.insertCell();
            let celdaTelefono_scliente = fila.insertCell();
            let celdaCorreo_reservaciones = fila.insertCell();
            let celdaTelefono_reservaciones = fila.insertCell();
            let celdaOpciones = fila.insertCell();



            celdaNombre.innerHTML = listaHotel[i]['nombre_hotel'];
            celdaDireccion.innerHTML = listaHotel[i]['direccion_hotel'];
            celdaCorreo_scliente.innerHTML = listaHotel[i]['correo_servicio_cliente'];
            celdaTelefono_scliente.innerHTML = listaHotel[i]['telefono_servicio_cliente'];
            celdaCorreo_reservaciones.innerHTML = listaHotel[i]['correo_reservaciones'];
            celdaTelefono_reservaciones.innerHTML = listaHotel[i]['telefono_reservaciones'];


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.dataset._id = listaHotel[i]['_id'];
            botonEditar.addEventListener('click', buscar_hotel_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('.sct_registro_hotel')
                popup.style.display = "block";
            });
            // let titulo;
            // titulo = document.getElementById('h1');
            // titulo.innerHTML = 'Registrar Usuario';
            // // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
            // $(".scroll").animate({ scrollTop: 0 }, "fast");


            celdaOpciones.appendChild(botonEditar);

            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset._id = listaHotel[i]['_id'];

            botonEliminar.addEventListener('click', remover_hotel);
            celdaOpciones.appendChild(botonEliminar);

            let botonResenna = document.createElement('span');
            botonResenna.classList.add('fas');
            botonResenna.classList.add('fa-gavel');
            botonResenna.dataset._id = listaHotel[i]['_id'];

            botonResenna.addEventListener('click', remover_hotel);
            celdaOpciones.appendChild(botonResenna);
        }
    };
};

function buscar_hotel_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;

    let hotel = buscar_hotel_por_id(_id);

    console.log(hotel);

    inputIdHotel.value = hotel['_id'];

    inputNombre.value = hotel['nombre_hotel'];
    inputLatitud.value = hotel['latitud_hotel']
    inputLongitud.value = hotel['longitud_hotel']
    inputDireccion.value = hotel['direccion_hotel']
    inputProvincia.value = hotel['provincia_hotel'];
    inputCanton.value = hotel['canton_hotel'];
    inputDistrito.value = hotel['distrito_hotel'];
    inputCorreo_cliente.value = hotel['correo_servicio_cliente'];
    inputTelefono_cliente.value = hotel['telefono_servicio_cliente'];
    inputCorreo_reservacion.value = hotel['correo_reservaciones']
    inputTelefono_reservacion.value = hotel['telefono_reservaciones'];
    selectEstado.value = hotel['estado_hotel'];

    let sProvincia = document.querySelector('#sltProvincia');
    for (let i = 1; i < sProvincia.length; i++) {
        if (sProvincia.options[i].value == hotel['provincia_hotel']) {
            sProvincia.selectedIndex = i;
        }
    }
    llenarCanton();
    let sCanton = document.querySelector('#sltCanton');
    for (let i = 1; i < sCanton.length; i++) {
        if (sCanton.options[i].value == hotel['canton_hotel']) {
            sCanton.selectedIndex = i;
        }
    }
    llenarDistrito();
    let sDistrito = document.querySelector('#sltDistrito');
    for (let i = 1; i < sDistrito.length; i++) {
        if (sDistrito.options[i].value == hotel['distrito_hotel']) {
            sDistrito.selectedIndex = i;
        }
    }
};

function remover_hotel() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "El hotel se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminar_hotel(_id);
            listaHotel = obtener_hoteles();
            mostrarListahoteles();
            swal(
                'Eliminado!',
                'El curso ha sido eliminado con éxito',
                'success'
            )
        }
    });

};
let ppRegistrar = document.querySelector('.sct_registro_hotel');
window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormulario();
    }
};

function limpiarFormulario() {
    inputNombre.value = '';
    inputLatitud.value = '';
    inputLongitud.value = '';
    inputDireccion.value = '';
    inputProvincia.value = '';
    inputCanton.value = '';
    inputDistrito.value = '';
    inputCorreo_cliente.value = '';
    inputTelefono_cliente.value = '';
    inputCorreo_reservacion.value = '';
    inputTelefono_reservacion.value = '';
    selectEstado.value = '';
}