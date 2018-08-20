'use strict';

mostrarListaUsuarios();

const inputFoto = document.querySelector('#txtImagen');
const inputPrimer_nombre = document.querySelector('#txtNombre');
const inputSegundo_nombre = document.querySelector('#txtSegundo_nombre');
const inputPrimer_apellido = document.querySelector('#txtPrimer_apellido');
const inputSegundo_apellido = document.querySelector('#txtSegundo_apellido');
const inputCedula = document.querySelector('#txtCedula');
const inputCorreo = document.querySelector('#txtCorreo');
const inputFecha_nacimiento = document.querySelector('#dateFecha_nacimiento');
const inputSexo = document.querySelector('#sltSexo');
const inputContrasenna = document.querySelector('#txtContrasenna');
const inputConfirmacion_contrasenna = document.querySelector('#txtContrasenna_confirmacion');
const inputIdUsuario = document.querySelector('#idUsuario');

let inputBuscar = document.querySelector('#txtBusqueda');

inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaUsuarios(busqueda);
});


let sNombre = '';
let sSegundo_nombre = '';
let sApellido = '';
let sSegundo_apellido = '';
let sCedula = '';
let sCorreo = '';
let dFecha_nacimiento = '';
let sSexo = '';
let rolCliente = 'Administrador';
let sContrasenna = '';
let sConfirmacion_contrasenna = '';

const botonRegistrar = document.querySelector('#btn_Registrar');

botonRegistrar.addEventListener('click', obtenerDatosUsuarios);

const botonActualizar = document.querySelector('#btn_Actualizar');

botonActualizar.addEventListener('click', obtenerDatosActualizar);
botonActualizar.hidden = true;

function obtenerDatosUsuarios() {
    let bError = false;
    let ainfoUsuarios = [];

    sNombre = inputPrimer_nombre.value;
    sSegundo_nombre = inputSegundo_nombre.value;
    sApellido = inputPrimer_apellido.value;
    sSegundo_apellido = inputSegundo_apellido.value;
    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    dFecha_nacimiento = inputFecha_nacimiento.value;
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;
    sConfirmacion_contrasenna = inputConfirmacion_contrasenna.value;

    ainfoUsuarios.push(imagenUrl, sNombre, sSegundo_nombre, sApellido, sSegundo_apellido,
        sCedula, dFecha_nacimiento, sSexo, sCorreo, rolCliente, sContrasenna, sConfirmacion_contrasenna);

    bError = validarUsuarios();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el usuario, verifique que los espacios marcados en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido!'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El usuario se registro correctamente, por favor revise su correo para iniciar sesión',
            type: 'success',
            confirmButtonText: 'Entendido!'
        });
        window.location.href("../../html/index.html");
        registrar_usuarios(ainfoUsuarios);
        mostrarListaUsuarios();
        limpiarFormulario();
        window.location.href("../../html/index.html");
    }

};

function validarUsuarios() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('input:required');
    let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    let regexSoloNumero = /^[0-9-]+$/;
    let regexCorreo = /^[a-zA-Z0-9._]+@gmail.com+$/;
    let regexContrasenna = /^[a-zA-Z0-9.]+$/;

    sNombre = inputPrimer_nombre.value;
    sSegundo_nombre = inputSegundo_nombre.value;
    sApellido = inputPrimer_apellido.value;
    sSegundo_apellido = inputSegundo_apellido.value;
    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    dFecha_nacimiento = inputFecha_nacimiento.value;
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;
    sConfirmacion_contrasenna = inputConfirmacion_contrasenna.value;

    if (regexSoloLetras.test(sNombre) == false || sNombre == '') {
        bError = true;
        inputPrimer_nombre.classList.add('errorInput');
    } else {
        inputPrimer_nombre.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sApellido) == false || sApellido == '') {
        bError = true;
        inputPrimer_apellido.classList.add('errorInput');
    } else {
        inputPrimer_apellido.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sSexo) == false || sSexo == '') {
        bError = true;
        inputSexo.classList.add('errorInput');
    } else {
        inputSexo.classList.remove('errorInput');
    }
    if (regexSoloNumero.test(sCedula) == false || sCedula == '') {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    }
    if (regexSoloNumero.test(dFecha_nacimiento) == false || dFecha_nacimiento == '') {
        bError = true;
        inputFecha_nacimiento.classList.add('errorInput');
    } else {
        inputFecha_nacimiento.classList.remove('errorInput');
    }
    if (regexCorreo.test(sCorreo) == false || sCorreo == '') {
        bError = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    if (regexContrasenna.test(sContrasenna) == false || sContrasenna == '') {
        bError = true;
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }
    if (regexContrasenna.test(sConfirmacion_contrasenna) == false && sConfirmacion_contrasenna != sContrasenna || sConfirmacion_contrasenna == '') {
        bError = true;
        inputConfirmacion_contrasenna.classList.add('errorInput');
    } else {
        inputConfirmacion_contrasenna.classList.remove('errorInput');
    }

    return bError;
};

function obtenerDatosActualizar() {
    let bError = false;
    let ainfoUsuarios = [];

    let _id = inputIdUsuario.value;
    sNombre = inputPrimer_nombre.value;
    sSegundo_nombre = inputSegundo_nombre.value;
    sApellido = inputPrimer_apellido.value;
    sSegundo_apellido = inputSegundo_apellido.value;
    dFecha_nacimiento = inputFecha_nacimiento.value;
    sSexo = inputSexo.value;


    ainfoUsuarios.push(_id, imagenUrl, sNombre, sSegundo_nombre, sApellido, sSegundo_apellido, dFecha_nacimiento, sSexo);

    bError = validarUsuarios();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el usuario, verifique que los espacios marcados en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido!'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El usuario se registro correctamente',
            type: 'success',
            confirmButtonText: 'Entendido!'
        });
        actualizarUsuario(ainfoUsuarios);
        mostrarListaUsuarios();
        limpiarFormulario();
    }

};

function mostrarListaUsuarios(paBuscar) {
    let listaUsuarios = obtener_usuarios();
    let tbody = document.querySelector('#tblUsuarios tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if ((listaUsuarios[i]['primer_nombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();

            let celdaFoto = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCedula = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaFecha_nacimiento = fila.insertCell();
            let celdaSexo = fila.insertCell();
            let celdaOpciones = fila.insertCell();


            let imagen = document.createElement('img');
            imagen.src = listaUsuarios[i]['foto_usuario'];
            imagen.classList.add('imageSettings');
            celdaFoto.appendChild(imagen);

            celdaNombre.innerHTML = listaUsuarios[i]['primer_nombre_usuario'];
            celdaCedula.innerHTML = listaUsuarios[i]['cedula_usuario'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo_usuario'];
            celdaFecha_nacimiento.innerHTML = listaUsuarios[i]['fechaNacimiento_usuario'];
            celdaSexo.innerHTML = listaUsuarios[i]['sexo_usuario'];



            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.dataset._id = listaUsuarios[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('.sct_usuario')
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
            botonEliminar.dataset._id = listaUsuarios[i]['_id'];

            celdaOpciones.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', eliminar_usuario);

        }
    };
};

function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    document.getElementById('lbContrasenna').style.display = 'none';
    inputContrasenna.hidden = true;
    document.getElementById('lbCedula').style.display = 'none';
    inputCedula.hidden = true;
    document.getElementById('lbCorreo').style.display = 'none';
    inputCorreo.hidden = true;
    document.getElementById('lbConfirmacion').style.display = 'none';
    inputConfirmacion_contrasenna.hidden = true;

    let usuario = buscar_usuario_por_id(_id);

    console.log(usuario);

    inputIdUsuario.value = usuario['_id'];
    inputFoto.src = usuario['foto_usuario'];
    inputPrimer_nombre.value = usuario['primer_nombre_usuario'];
    inputSegundo_nombre.value = usuario['segundo_nombre_usuario']
    inputPrimer_apellido.value = usuario['primer_apellido_usuario'];
    inputSegundo_apellido.value = usuario['segundo_apellido_usuario'];
    inputCedula.value = usuario['cedula_usuario'];
    inputFecha_nacimiento.value = usuario['fechaNacimiento_usuario'];
    inputCorreo.value = usuario['correo_usuario'];
    inputSexo.value = usuario['sexo_usuario']
    inputContrasenna.value = usuario['constrasenna_usuario'];
    inputConfirmacion_contrasenna.value = usuario['contrasennaConfirmacion_usuario']
};

function eliminar_usuario() {
    let _id = this.dataset._id;
    swal({
        title: 'Desea eliminar a este usuario?',
        text: "El usuario se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarUsuario(_id);
            swal(
                'Eliminado!',
                'El usuario ha sido eliminado con éxito',
                'success'
            )
            mostrarListaUsuarios();
        }
    });

};
function limpiarFormulario() {

    inputFoto.value = '';
    inputPrimer_nombre.value = '';
    inputSegundo_nombre.value = '';
    inputPrimer_apellido.value = '';
    inputSegundo_apellido.value = '';
    inputCedula.value = '';
    inputCorreo.value = '';
    inputFecha_nacimiento.value = '';
    inputSexo.value = '';
    inputContrasenna.value = '';
    inputConfirmacion_contrasenna.value = '';
};