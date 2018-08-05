'use strict';

mostrarListaSolicitudes();

let inputBuscar = document.querySelector('#txtBusqueda');
let listaSolicitudes = obtenerSolicitud();
inputBuscar.addEventListener('keyup', function () {

    mostrarListaSolicitudes(inputBuscar.value);
});

function mostrarListaSolicitudes(pFiltro) {
    let listaSolicitudes = obtenerSolicitud();

    let tbody = document.querySelector('section table tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';
    for (let i = 0; i < listaSolicitudes.length; i++) {
        if (listaSolicitudes[i]['profesor_solicitud'].toLowerCase().includes(pFiltro.toLowerCase()) ||
        listaSolicitudes[i]['nombre_solicitud'].toLowerCase().includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let cProfesor_solicitud = fila.insertCell();
            let cCarrera_solicitud = fila.insertCell();
            let cCurso_solicitud = fila.insertCell();
            let cPeriodo_solicitud = fila.insertCell();
            let cGrupo_solicitud = fila.insertCell();
            let cNombre_solicitud = fila.insertCell();
            let cEstado_solicitud = fila.insertCell();
            
            let celdaOpciones = fila.insertCell();

            cProfesor_solicitud.innerHTML = listaSolicitudes[i]['profesor_solicitud'],
            cCarrera_solicitud.innerHTML = listaSolicitudes[i]['carrera_solicitud'],
            cCurso_solicitud.innerHTML = listaSolicitudes[i]['curso_solicitud']
            cPeriodo_solicitud.innerHTML = listaSolicitudes[i]['periodo_solicitud'],
            cGrupo_solicitud.innerHTML = listaSolicitudes[i]['grupo_solicitud'],
            cNombre_solicitud.innerHTML = listaSolicitudes[i]['nombre_solicitud'],
            cEstado_solicitud.innerHTML = listaSolicitudes[i]['estado_solicitud']

            // boton  editar
            let botonEditar = document.createElement('span');
            botonEditar.href = '#'// path del html editar lab
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset._id = listaSolicitudes[i]['_id'];

            botonEditar.addEventListener('click', buscar_por_solicitud_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar');
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


            botonEliminar.dataset._id = listaSolicitudes[i]['_id'];

            botonEliminar.addEventListener('click', remover_solicitud);

            celdaOpciones.appendChild(botonEliminar);

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

function remover_solicitud() {
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
//////////////////Registrar
mostrarCurso();
mostrarGrupos();
mostrarPeriodos();
mostrarCarrera();

const botonRegistrar = document.querySelector('#btn_Registrar');
const botonActualizar = document.querySelector('#btn_Actualizar');

botonActualizar.hidden = true;
botonRegistrar.addEventListener('click', obtenerDatos);
botonActualizar.addEventListener('click', obtenerSolicitudActualizar);

let popup;
const inputProfesor = document.querySelector('#txtProfesor');
const inputNombre = document.querySelector('#txtNombre');
const inputCarrera = document.querySelector('#sltCarrera');
const inputCurso = document.querySelector('#sltCurso');
const inputPeriodo = document.querySelector('#sltPeriodo');
const inputGrupo = document.querySelector('#sltGrupo');
const inputEstado = document.querySelector('#sltEstado');
const inputIdSolicitud = document.querySelector('#txtId');

let sProfesor = '';
let sCarrera = '';
let sCurso = '';
let sPeriodo = '';
let sGrupo = '';
let sNombre = '';
let sEstado = '';
let sIdCurso = '';

function obtenerDatos() {
    let bError = false;
    let aInfoSolicitud = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;
    aInfoSolicitud.push(sProfesor, sCarrera, sCurso, sPeriodo, sGrupo, sNombre, sEstado);

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

function obtenerSolicitudActualizar() {
    let bError = false;
    let aInfoSolicitud = [];

    sProfesor = inputProfesor.value;
    sCarrera = inputCarrera.value;
    sCurso = inputCurso.value;
    sPeriodo = inputPeriodo.value;
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;
    sIdCurso = inputIdSolicitud.value;

    aInfoSolicitud.push(sIdCurso, sProfesor, sCarrera, sCurso, sPeriodo, sGrupo, sNombre, sEstado);

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
    sGrupo = inputGrupo.value;
    sNombre = inputNombre.value;

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