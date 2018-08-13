'use strict';

//////////////////Registrar
mostrarCurso();
mostrarPeriodos();
mostrarCarrera();
mostrarCarreraPostulante();

const botonRegistrar = document.querySelector('#btn_Registrar');
const botonActualizar = document.querySelector('#btn_Actualizar');
const botonActualizarPostulante = document.querySelector('#btn_RegistrarPostulante');
let rol = localStorage.getItem('rolUsuario');
botonActualizar.hidden = true;


botonRegistrar.addEventListener('click', obtenerDatos);
botonActualizar.addEventListener('click', obtenerSolicitudActualizar);

let popup;
const inputProfesor = localStorage.getItem('correo_usuario');
const inputNombre = document.querySelector('#txtNombre');
const inputCarrera = document.querySelector('#sltCarrera');
const inputCurso = document.querySelector('#sltCurso');
const inputPeriodo = document.querySelector('#sltPeriodo');
const inputEstado = document.querySelector('#sltEstado');
const inputIdSolicitud = document.querySelector('#txtId');

const inputCedula = document.querySelector('#txtCedula');
const inputCorreo = document.querySelector('#txtCorreo');
const inputTelefono = document.querySelector('#txtTelefono');
const inputDireccion = document.querySelector('#txtDireccion');
const inputCarrera_postulante = document.querySelector('#sltCarrera_Postulante');
const inputFecha_ingreso = document.querySelector('#txtFecha_ingreso');
const inputIdPostulante = document.querySelector('#txtIdPostulante');

// if(rol.toLowerCase() == 'Administrador'.toLowerCase()){
//     botonActualizarPostulante.addEventListener('click', obtenerDatosPostulante);
// };



let sProfesor = '';
let sCarrera = '';
let sCurso = '';
let sPeriodo = '';
let sNombre = '';
let sEstado = '';
let sIdCurso = '';

let sCedula = '';
let sCorreo = '';
let sTelefono = '';
let sDireccion = '';
let sCarrera_Postulante = '';
let sFecha_ingreso = '';
let idSolicitud = '';


function obtenerDatos() {
    let bError = false;
    let aInfoSolicitud = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sNombre = inputNombre.value;

    if (rol.toLowerCase() == 'Administrador'.toLowerCase()) {
        sProfesor = inputProfesor.value
    }

    if (rol.toLowerCase() == 'Administrador'.toLowerCase()) {
        sEstado = 'Pendiente de decanatura'
    } else {
        sEstado = inputEstado.value;
    }
    aInfoSolicitud.push(inputProfesor, sCarrera, sCurso, sPeriodo, sNombre, sEstado);

    bError = validarSolicitudes();
    if (bError == true) {
        swal({
            type: 'error',
            title: 'Registro incorrecto',
            text: 'Revise los espacios marcados en rojo!',
            confirmButtonText: 'Entendido'
        })
    } else {
        registrarSolicitud(aInfoSolicitud);
        swal({
            title: 'Registro completado!',
            text: 'El registro se ha completado exitosamente!',
            type: 'success',
            confirmButtonText: 'Entendido'
        })
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
    }
};


///////////POSTULANTES A ASISTENTES
function obtenerDatosPostulante() {
    let bError = false;
    let aInfoPostulante = [];

    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    sTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sCarrera_Postulante = inputCarrera_postulante.value;
    sFecha_ingreso = inputFecha_ingreso.value;
    idSolicitud = inputIdSolicitud.value;

    aInfoPostulante.push(sCedula, sCorreo, sTelefono, sDireccion, sCarrera_Postulante, sFecha_ingreso, idSolicitud);

    bError = validarPostulantes();
    if (bError == true) {
        swal({
            type: 'error',
            title: 'Registro incorrecto',
            text: 'Revise los espacios marcados en rojo!',
            confirmButtonText: 'Entendido'
        })
    } else {
        registrarPostulante(aInfoPostulante);
        swal({
            title: 'Registro completado!',
            text: 'El registro se ha completado exitosamente!',
            type: 'success',
            confirmButtonText: 'Entendido'
        })
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
    }

};
function validarPostulantes() {
    let bError = false;
    let arregloInputs = document.querySelector('input:required');

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9-/]+$/;
    let regexCodigo = /^[a-zA-Z0-9/-]+$/;
    let regexEmail = /^[a-zA-Z0-9._]+@ucenfotec.ac.cr+$/;


    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    sTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sCarrera_Postulante = inputCarrera_postulante.value;
    sFecha_ingreso = inputFecha_ingreso.value;

    for (let i = 0; i <= arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };


    if (regexEmail.test(sCorreo) == false) {
        bError = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sTelefono) == false) {
        bError = true;
        inputTelefono.classList.add('errorInput');
    } else {
        inputTelefono.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sDireccion) == false) {
        bError = true;
        inputDireccion.classList.add('errorInput');
    } else {
        inputDireccion.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sCarrera_Postulante) == false) {
        bError = true;
        inputCarrera_postulante.classList.add('errorInput');
    } else {
        inputCarrera_postulante.classList.remove('errorInput');
    }
    if (regexSoloNumeros.test(sFecha_ingreso) == false) {
        bError = true;
        inputFecha_ingreso.classList.add('errorInput');
    } else {
        inputFecha_ingreso.classList.remove('errorInput');
    }

    return bError;
};


//////////////MODIFICAR
function obtenerSolicitudActualizar() {
    let bError = false;
    let aInfoSolicitud = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;
    sIdCurso = inputIdSolicitud.value;

    aInfoSolicitud.push(sIdCurso, sProfesor, sCarrera, sCurso, sPeriodo, sNombre, sEstado);

    bError = validarSolicitudes();
    if (bError == true) {
        swal({
            type: 'error',
            title: 'Actualización incorrecta!',
            text: 'No se pudo actualizar la solicitud, verifique que completó correctamente la información que se le solicita',
            confirmButtonText: 'Entendido'
        })
    } else {
        actualizarSolicitud(aInfoSolicitud);
        swal({
            title: 'Actualización correcto!',
            text: 'La solicitud se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        })
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
    }
};

function validarSolicitudes() {
    let bError = false;
    let arregloInputs = document.querySelector('input:required');

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9-]+$/;
    let regexCodigo = /^[a-zA-Z0-9/-]+$/;
    sProfesor = inputProfesor.value;
    sPeriodo = inputPeriodo.value;
    sNombre = inputNombre.value;

    if (rol.toLowerCase() == 'Asistente decanatura'.toLowerCase()) {

        for (let i = 0; i <= arregloInputs.length; i++) {
            if (arregloInputs[i].value == '') {
                bError = true;
                arregloInputs[i].classList.add('errorInput');
            } else {
                arregloInputs[i].classList.remove('errorInput');
            }
        };

    }

    if (regexSoloLetras.test(sCarrera) == false) {
        bError = true;
        inputCarrera.classList.add('errorInput');
    } else {
        inputCarrera.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sCurso) == false) {
        bError = true;
        inputCurso.classList.add('errorInput');
    } else {
        inputCurso.classList.remove('errorInput');
    }
    if (regexCodigo.test(sPeriodo) == false) {
        bError = true;
        inputPeriodo.classList.add('errorInput');
    } else {
        inputPeriodo.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    }
    if (regexSoloLetras.test(sEstado) == false) {
        bError = true;
        inputEstado.classList.add('errorInput');
    } else {
        inputEstado.classList.remove('errorInput');
    }
    return bError;
};
function mostrarCarrera() {
    let listaCarreras = obtenerListaCarreras();
    let selectCarrera = document.querySelector('#sltCarrera');
    for (let i = 0; i < listaCarreras.length; i++) {
        let nuevaOpcion = new Option(listaCarreras[i]['nombre_carrera']);
        nuevaOpcion.value = listaCarreras[i]['nombre_carrera'];
        selectCarrera.appendChild(nuevaOpcion);
    }
};

function mostrarCarreraPostulante() {
    let listaCarreras = obtenerListaCarreras();
    let selectCarrera = document.querySelector('#sltCarrera_Postulante');
    for (let i = 0; i < listaCarreras.length; i++) {
        let nuevaOpcion = new Option(listaCarreras[i]['nombre_carrera']);
        nuevaOpcion.value = listaCarreras[i]['nombre_carrera'];

        if (selectCarrera != null) {
            selectCarrera.appendChild(nuevaOpcion);
        }
    }
};
// ;
function mostrarCurso() {
    let listaCursos = obtenerCursos();
    let selectCurso = document.querySelector('#sltCurso');
    for (let i = 0; i < listaCursos.length; i++) {
        let nuevaOpcion = new Option(listaCursos[i]['nombre_curso']);
        nuevaOpcion.value = listaCursos[i]['nombre_curso'];
        selectCurso.appendChild(nuevaOpcion);
    }
};
function mostrarPeriodos() {
    let listaSedes = obtenerListaPeriodos();
    let selectPeriodo = document.querySelector('#sltPeriodo');
    for (let i = 0; i < listaSedes.length; i++) {
        let nuevaOpcion = new Option(listaSedes[i]['nombre_periodo']);
        nuevaOpcion.value = listaSedes[i]['nombre_periodo'];
        selectPeriodo.appendChild(nuevaOpcion);
    }
};
/////Listar
mostrarListaSolicitudes();

let inputBuscar = document.querySelector('#txtBusqueda');
let listaSolicitudes = obtenerSolicitud();

inputBuscar.addEventListener('keyup', function () {

    mostrarListaSolicitudes(inputBuscar.value);
});

function mostrarListaSolicitudes(pFiltro) {
    let listaSolicitudes = obtenerSolicitud();
    let correoProfesor = localStorage.getItem('correo_usuario');

    let listaPostulantes = obtenerPostulante();
    let tbody = document.querySelector('section table tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';
    for (let i = 0; i < listaSolicitudes.length; i++) {
        if (listaSolicitudes[i]['profesor_solicitud'].toLowerCase().includes(pFiltro.toLowerCase()) ||
            listaSolicitudes[i]['nombre_solicitud'].toLowerCase().includes(pFiltro.toLowerCase())) {

            if (inputProfesor == correoProfesor) {
                if (inputProfesor == listaSolicitudes[i]['profesor_solicitud']) {
                    let fila = tbody.insertRow();

                    let cProfesor_solicitud = fila.insertCell();
                    let cCarrera_solicitud = fila.insertCell();
                    let cCurso_solicitud = fila.insertCell();
                    let cPeriodo_solicitud = fila.insertCell();
                    let cNombre_solicitud = fila.insertCell();
                    let cEstado_solicitud = fila.insertCell();

                    let celdaOpciones = fila.insertCell();

                    cProfesor_solicitud.innerHTML = listaSolicitudes[i]['profesor_solicitud'],
                        cCarrera_solicitud.innerHTML = listaSolicitudes[i]['carrera_solicitud'],
                        cCurso_solicitud.innerHTML = listaSolicitudes[i]['curso_solicitud'],
                        cPeriodo_solicitud.innerHTML = listaSolicitudes[i]['periodo_solicitud'],
                        cNombre_solicitud.innerHTML = listaSolicitudes[i]['nombre_solicitud'],
                        cEstado_solicitud.innerHTML = listaSolicitudes[i]['estado_solicitud']

                    // boton  editar
                    let botonEditar = document.createElement('span');
                    botonEditar.href = '#'// path del html editar lab
                    botonEditar.classList.add('fas');
                    botonEditar.classList.add('fa-cogs');

                    botonEditar.dataset._id = listaSolicitudes[i]['_id'];

                    botonEditar.addEventListener('click', buscar_por_solicitud_id);


                    if (rol.toLowerCase() == 'Decanatura'.toLowerCase() &&
                    inputEstado.value.toLowerCase() == 'Reprobado por rectoría'.toLowerCase()) {
                    botonEditar.addEventListener('click', function () {
                        popup = document.querySelector('#sct_modificar');
                        popup.style.display = "block";
                    });
                    celdaOpciones.appendChild(botonEditar);
                }

                    if (rol.toLowerCase() == 'Administrador'.toLowerCase() &&
                        inputEstado.value.toLowerCase() == 'Pendiente de Decanatura'.toLowerCase()) {
                        botonEditar.addEventListener('click', function () {
                            popup = document.querySelector('#sct_registrar');
                            popup.style.display = "block";
                            let titulo;
                            titulo = document.getElementById('h1');
                            titulo.innerHTML = 'Modificar solicitud';
                        });
                        celdaOpciones.appendChild(botonEditar);
                    }
                    else {
                        botonEditar.addEventListener('click', function () {


                            let ocultar = document.querySelector('#div_registrar');
                            ocultar.hidden = false;

                            popup = document.querySelector('#sct_registrar');
                            popup.style.display = "block";
                            let titulo;
                            titulo = document.getElementById('h1');
                            titulo.innerHTML = 'Modificar solicitud';
                        });
                    }
                    celdaOpciones.appendChild(botonEditar);


                    // boton eliminar
                    let botonEliminar = document.createElement('span');
                    botonEliminar.href = '#'//evento  eliminar lab
                    botonEliminar.classList.add('fas');
                    botonEliminar.classList.add('fa-trash-alt');


                    botonEliminar.dataset._id = listaSolicitudes[i]['_id'];

                    botonEliminar.addEventListener('click', remover_solicitud);

                    celdaOpciones.appendChild(botonEliminar);



                    let botonVer = document.createElement('span');
                    botonVer.href = '#'// path del html editar lab
                    botonVer.classList.add('fas');
                    botonVer.classList.add('fa-eye');

                    botonVer.dataset._id = listaPostulantes[i]['_id'];
                    debugger;
                    botonVer.addEventListener('click', buscar_por_postulante_id);

                    botonVer.addEventListener('click', function () {
                        popup = document.querySelector('#sct_postulante');
                        popup.style.display = "block";
                    });

                    celdaOpciones.appendChild(botonVer);
                }
            } else {
                let fila = tbody.insertRow();

                let cProfesor_solicitud = fila.insertCell();
                let cCarrera_solicitud = fila.insertCell();
                let cCurso_solicitud = fila.insertCell();
                let cPeriodo_solicitud = fila.insertCell();
                let cNombre_solicitud = fila.insertCell();
                let cEstado_solicitud = fila.insertCell();

                let celdaOpciones = fila.insertCell();

                cProfesor_solicitud.innerHTML = listaSolicitudes[i]['profesor_solicitud'],
                    cCarrera_solicitud.innerHTML = listaSolicitudes[i]['carrera_solicitud'],
                    cCurso_solicitud.innerHTML = listaSolicitudes[i]['curso_solicitud'],
                    cPeriodo_solicitud.innerHTML = listaSolicitudes[i]['periodo_solicitud'],
                    cNombre_solicitud.innerHTML = listaSolicitudes[i]['nombre_solicitud'],
                    cEstado_solicitud.innerHTML = listaSolicitudes[i]['estado_solicitud']

                // boton  editar
                let botonEditar = document.createElement('span');
                botonEditar.href = '#'// path del html editar lab
                botonEditar.classList.add('fas');
                botonEditar.classList.add('fa-cogs');

                botonEditar.dataset._id = listaSolicitudes[i]['_id'];

                botonEditar.addEventListener('click', buscar_por_solicitud_id);


                if (rol.toLowerCase() == 'Administrador'.toLowerCase() &&
                    inputEstado.value.toLowerCase() == 'Pendiente de Decanatura'.toLowerCase()) {

                    botonEditar.addEventListener('click', function () {

                        popup = document.querySelector('#sct_registrar');
                        popup.style.display = "block";
                        let titulo;
                        titulo = document.getElementById('h1');
                        titulo.innerHTML = 'Modificar solicitud';
                    });
                    celdaOpciones.appendChild(botonEditar);
                }
                else {
                    botonEditar.addEventListener('click', function () {

                        let ocultar = document.querySelector('#div_registrar');
                        ocultar.hidden = false;

                        popup = document.querySelector('#sct_registrar');
                        popup.style.display = "block";
                        let titulo;
                        titulo = document.getElementById('h1');
                        titulo.innerHTML = 'Modificar solicitud';
                    });
                }
                celdaOpciones.appendChild(botonEditar);


                // boton eliminar
                let botonEliminar = document.createElement('span');
                botonEliminar.href = '#'//evento  eliminar lab
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');


                botonEliminar.dataset._id = listaSolicitudes[i]['_id'];

                botonEliminar.addEventListener('click', remover_solicitud);

                celdaOpciones.appendChild(botonEliminar);

                celdaOpciones.appendChild(botonEliminar);

                let botonVer = document.createElement('span');
                botonVer.href = '#'// path del html editar lab
                botonVer.classList.add('fas');
                botonVer.classList.add('fa-eye');

                botonVer.dataset._id = listaPostulantes[i]['_id'];
                debugger;
                botonVer.addEventListener('click', buscar_por_postulante_id);

                botonVer.addEventListener('click', function () {
                    popup = document.querySelector('#sct_postulante');
                    popup.style.display = "block";
                });
                celdaOpciones.appendChild(botonEditar);
                celdaOpciones.appendChild(botonVer);
            }

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de visualizar: <i class="fas fa-eye"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>

        }
    }
};

function buscar_por_solicitud_id() {

    let _id = this.dataset._id;

    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let listaSolicitudes = buscar_solicitud_id(_id);

    inputCarrera.value = listaSolicitudes['carrera_solicitud'],
        inputCurso.value = listaSolicitudes['curso_solicitud'];
    inputPeriodo.value = listaSolicitudes['periodo_solicitud'],
        inputNombre.value = listaSolicitudes['nombre_solicitud'],
        inputEstado.value = listaSolicitudes['estado_solicitud'],
        inputIdSolicitud.value = listaSolicitudes['_id']
};

function buscar_por_postulante_id() {

    let _id = this.dataset._id;

    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    debugger;
    let postulante = buscar_postulante_id(_id);

    debugger;

    $("#div_tabla_postulantes .td_cedula").text(postulante['cedula_postulante']);
    $("#div_tabla_postulantes .td_correo").text(postulante['correo_postulante']);
    $("#div_tabla_postulantes .td_telefono").text(postulante['telefono_postulante']);
    $("#div_tabla_postulantes .td_direccion").text(postulante['direccion_postulante']);
    $("#div_tabla_postulantes .td_carrera").text(postulante['carrera_postulante']);
    $("#div_tabla_postulantes .td_ingreso").text(postulante['fecha_ingreso_postulante']);
};

////////////ELIMINAR
function remover_solicitud() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "La solicitud se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarSolicitud(_id);
            listaSolicitudes = obtenerSolicitud();
            mostrarListaSolicitudes();
            swal(
                'Eliminado!',
                'La solicitud ha sido eliminado con éxito',
                'success'
            )
        }
    });

};

function limpiarFormulario() {

    inputCarrera.value = '';
    inputCurso.value = '';
    inputPeriodo.value = '';
    inputNombre.value = '';
    inputEstado.value = '';
};
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
    let titulo;
    titulo = document.getElementById('h1');
    titulo.innerHTML = 'Registrar solicitud';
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
        limpiarFormulario();
    }
}
function clean() {
    popup.style.display = "none";
    limpiarFormulario();
}
function reload() {
    location.reload();
}
// Esto es para que despliegue el formulario