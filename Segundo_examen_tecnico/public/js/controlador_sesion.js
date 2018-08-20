'use strict';

let windowLocation = window.location.href;
let listaUsuarios = obtener_usuarios();

// Inicio iniciar sesion
let inputCorreoUsuario = document.querySelector('#txtCorreo');
let inputContrasennaUsuario = document.querySelector('#txtContrasenna');
let botonIngresar = document.querySelector('#btnIngresar');
botonIngresar.addEventListener('click', obtenerDatosInicio);

let sCorreo = "";
let sContrasenna = "";

function obtenerDatosInicio() {
    localStorage.clear();
    sCorreo = inputCorreoUsuario.value;
    sContrasenna = inputContrasennaUsuario.value;

    // validar pequenno
    if (sCorreo == "") {
        inputCorreoUsuario.classList.add('errorInput');
    } else {
        inputCorreoUsuario.classList.remove('errorInput');
    }
    if (sContrasenna == "") {
        inputContrasennaUsuario.classList.add('errorInput');
    } else {
        inputContrasennaUsuario.classList.remove('errorInput');
    }
    // validar pequenno

    let bError = false;
    bError = verificarCredenciales(sCorreo, sContrasenna);
    if (bError) {
        swal({
            title: 'No se pudo iniciar sesión',
            text: 'Verifique que el correo y la contraseña estén bien escritos',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        accionRol(localStorage.getItem('rolUsuario'));
    }
}
// ssotom@ucenfotec.ac.cr
// 121000
function verificarCredenciales(sCorreo, sContrasenna) {

    let bError = true;
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (sCorreo === listaUsuarios[i]['correo_usuario']) {
            if (sContrasenna == listaUsuarios[i]['contrasenna_usuario']) {

                let nombreCompleto = listaUsuarios[i]['nombre_usuario']+' '+listaUsuarios[i]['primer_apellido_usuario']+' '+listaUsuarios[i]['segundo_apellido_usuario']
                localStorage.setItem('idUsuario', listaUsuarios[i]['_id']);
                localStorage.setItem('rolUsuario', listaUsuarios[i]['rol_usuario']);
                localStorage.setItem('nombreCompletoUsuario', nombreCompleto);
                localStorage.setItem('correo_usuario', listaUsuarios[i]['correo_usuario']);

                inputContrasennaUsuario.classList.remove('errorInput');
                bError = false;
                break;
            }
        }
    }
    return bError;
}
function accionRol(psRol) {
    switch (psRol) {
        case 'Administrador':
            window.location.href = "../html/hotel.html";
            break;
        case 'Cliente':
            window.location.href = "../html/usuario.html";
            break;

    }
}


// Fin iniciar sesion

// Inicio formulario
// let popup = document.querySelector('.popup-bg');
// let botonIniciar = document.querySelector('#btnIniciar');
// botonIniciar.addEventListener('click', function () {
//     popup.style.display = "block";
// });

// // Esto es para que se salga del formulario si toca fuera del contenido
// window.onclick = function (event) {
//     if (event.target == popup) {
//         popup.style.display = "none";
//         inputContrasenna.value = "";
//         inputCorreo.value = "";
//         inputCorreo.classList.remove('errorInput');
//         inputContrasenna.classList.remove('errorInput');
//     }
// }
// Esto es para que despliegue el formulario