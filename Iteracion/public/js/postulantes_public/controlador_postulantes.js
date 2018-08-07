'use strict';

mostrarListaPostulantes();

inputBuscar = document.querySelector('#txtBusqueda');
let listaPostulantes = obtenerPostulante();
listaSolicitudes = obtenerSolicitud();

inputBuscar.addEventListener('keyup', function () {

    mostrarListaPostulantes(inputBuscar.value);
});

function mostrarListaPostulantes(pFiltro) {
    let listaPostulantes = obtenerPostulante();

    let tbody = document.querySelector('#tblPostulante tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';
    for (let i = 0; i < listaPostulantes.length; i++) {
        if (listaPostulantes[i]['nombre_postulante'].toLowerCase().includes(pFiltro.toLowerCase()) ||
            listaPostulantes[i]['cedula_postulante'].toLowerCase().includes(pFiltro.toLowerCase()) ||
            listaPostulantes[i]['profesor_postulante'].toLowerCase().includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let cProfesor_postulante = fila.insertCell();
            let cNombre_postulante = fila.insertCell();
            let cCedula_postulante = fila.insertCell();
            let cCorreo_postulante = fila.insertCell();
            let cFecha_ingreso_postulante = fila.insertCell();
            let cTelefono_postulante = fila.insertCell();
            let cCarrera_postulante = fila.insertCell();

            let celdaOpciones = fila.insertCell();

            cProfesor_postulante.innerHTML = listaPostulantes[i]['profesor_postulante'],
                cNombre_postulante.innerHTML = listaPostulantes[i]['nombre_postulante'],
                cCedula_postulante.innerHTML = listaPostulantes[i]['cedula_postulante']
            cCorreo_postulante.innerHTML = listaPostulantes[i]['correo_postulante'],
                cFecha_ingreso_postulante.innerHTML = listaPostulantes[i]['fecha_ingreso_postulante'],
                cTelefono_postulante.innerHTML = listaPostulantes[i]['telefono_postulante'],
                cCarrera_postulante.innerHTML = listaPostulantes[i]['carrera_postulante']

            // boton  editar
            let botonEditar = document.createElement('span');
            botonEditar.href = '#'// path del html editar lab
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset._id = listaSolicitudes[i]['_id'];

            botonEditar.addEventListener('click', buscar_por_solicitud_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_modificar');
                popup.style.display = "block";
                let titulo;
                titulo = document.getElementById('h1');
                titulo.innerHTML = 'Modificar solicitud';
            });


            celdaOpciones.appendChild(botonEditar);


            // boton eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.href = '#'//evento  eliminar lab
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');


            botonEliminar.dataset._id = listaPostulantes[i]['_id'];

            botonEliminar.addEventListener('click', remover_postulante);

            celdaOpciones.appendChild(botonEliminar);


            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');


            celdaOpciones.appendChild(botonAsociar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }
    }
};

function buscar_por_solicitud_id() {

    let _id = this.dataset._id;

    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let listaSolicitudes = buscar_solicitud_id(_id);

        inputProfesor.value = listaSolicitudes['profesor_solicitud'],
        inputCarrera.value = listaSolicitudes['carrera_solicitud'],
        inputCurso.value = listaSolicitudes['curso_solicitud'];
        inputPeriodo.value = listaSolicitudes['periodo_solicitud'],
        inputGrupo.value = listaSolicitudes['grupo_solicitud'],
        inputNombre.value = listaSolicitudes['nombre_solicitud'],
        inputEstado.value = listaSolicitudes['estado_solicitud'],
        inputIdSolicitud.value = listaSolicitudes['_id']
};

function remover_postulante() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "El curso se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarPostulante(_id);
            listaSolicitudes = obtenerPostulante();
            mostrarListaPostulantes();
            swal(
                'Eliminado!',
                'La solicitud ha sido eliminado con éxito',
                'success'
            )
        }
    });

};
//////////////////Registrar
mostrarCurso();
mostrarPeriodos();
mostrarCarreraPostulante();

const botonRegistrar = document.querySelector('#btn_Registrar');
const botonActualizar = document.querySelector('#btn_Actualizar');

botonActualizar.hidden = true;
botonRegistrar.addEventListener('click', obtenerDatos);
botonActualizar.addEventListener('click', obtenerSolicitudActualizar);

popup;

const inputCedula = document.querySelector('#txtCedula');
const inputCorreo = document.querySelector('#txtCorreo');
const inputTelefono = document.querySelector('#txtTelefono');
const inputDireccion = document.querySelector('#txtDireccion');
const inputCarrera_postulante = document.querySelector('#sltCarrera_Postulante');
const inputFecha_ingreso = document.querySelector('#txtFecha_ingreso');


let sCedula = '';
let sCorreo = '';
let sTelefono = '';
let sDireccion = '';
let sCarrera_Postulante = '';
let sFecha_ingreso = '';

function obtenerDatos() {
    let bError = false;
    let aInfoPostulante = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    sTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sCarrera_Postulante = inputCarrera_postulante.value;
    sFecha_ingreso = inputFecha_ingreso.value;

    aInfoPostulante.push(sProfesor, sCarrera, sCurso, sPeriodo, sGrupo, sNombre, sEstado, sCedula, sCorreo, sTelefono,
        sDireccion, sCarrera_Postulante, sFecha_ingreso);

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

function obtenerSolicitudActualizar() {
    let bError = false;
    let aInfoPostulante = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

    sCedula = inputCedula.value;
    sCorreo = inputCorreo.value;
    sTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sCarrera_Postulante = inputCarrera_postulante.value;
    sFecha_ingreso = inputFecha_ingreso.value;

    aInfoPostulante.push(sProfesor, sCarrera, sCurso, sPeriodo, sGrupo, sNombre, sEstado, sCedula, sCorreo, sTelefono,
        sDireccion, sCarrera_Postulante, sFecha_ingreso);

    bError = validarPostulantes();
    if (bError == true) {
        swal({
            type: 'error',
            title: 'Actualización incorrecta!',
            text: 'No se pudo actualizar la solicitud, verifique que completó correctamente la información que se le solicita',
            confirmButtonText: 'Entendido'
        })
    } else {
        actualizarPostulante(aInfoPostulante);
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

function validarPostulantes() {
    let bError = false;
    let arregloInputs = document.querySelector('input:required');

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9-]+$/;
    let regexCodigo = /^[a-zA-Z0-9/-]+$/;
    let regexEmail = /^[a-zA-Z0-9._]+@ucenfotec.ac.cr+$/;

    sProfesor = inputProfesor.value;
    sPeriodo = inputPeriodo.value;
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;
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

    if (regexSoloLetras.test(sProfesor) == false) {
        bError = true;
        inputProfesor.classList.add('errorInput');
    } else {
        inputProfesor.classList.remove('errorInput');
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
    if (regexCodigo.test(sGrupo) == false) {
        bError = true;
        inputGrupo.classList.add('errorInput');
    } else {
        inputGrupo.classList.remove('errorInput');
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
function mostrarCarreraPostulante() {
    let listaCarreras = obtenerListaCarreras();
    let selectCarrera = document.querySelector('#sltCarrera_Postulante');
    for (let i = 0; i < listaCarreras.length; i++) {
        let nuevaOpcion = new Option(listaCarreras[i]['nombre_carrera']);
        nuevaOpcion.value = listaCarreras[i]['nombre_carrera'];
        selectCarrera.appendChild(nuevaOpcion);
    }
};
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
function mostrarGrupos() {
    let listaGrupos = obtenerListaGrupos();
    let selectGrupo = document.querySelector('#sltGrupo');
    for (let i = 0; i < listaGrupos.length; i++) {
        let nuevaOpcion = new Option(listaGrupos[i]['curso_grupo']);
        nuevaOpcion.value = listaGrupos[i]['curso_grupo'];
        selectGrupo.appendChild(nuevaOpcion);
    }
};
function limpiarFormulario() {

    inputProfesor.value = '';
    inputCarrera.value = '';
    inputCurso.value = '';
    inputPeriodo.value = '';
    inputGrupo.value = '';
    inputNombre.value = '';
    inputEstado.value = '';
};
botonAgregar = document.querySelector('#btnAgregar');
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