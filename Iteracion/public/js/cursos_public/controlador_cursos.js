'use strict';

mostrarListaCursos();


let inputBuscar = document.querySelector('#txtBusqueda');
let listaCursos = obtenerCursos();
inputBuscar.addEventListener('keyup', function () {

    mostrarListaCursos(inputBuscar.value);

});

function mostrarListaCursos(pFiltro) {
    debugger;
    let listaCursos = obtenerCursos();

    if (!pFiltro) {
        pFiltro = '';
    }
    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i]['nombre_curso'].toLowerCase().includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let cNombre_curso = fila.insertCell();
            let cCodigo_curso = fila.insertCell();
            let cCosto_curso = fila.insertCell();
            let cCreditos_curso = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            cNombre_curso.innerHTML = listaCursos[i]['nombre_curso'];
            cCodigo_curso.innerHTML = listaCursos[i]['codigo_curso'];
            cCosto_curso.innerHTML = numeroALetras(listaCursos[i]['costo_curso']);
            cCreditos_curso.innerHTML = listaCursos[i]['creditos_curso'];

            // boton  editar
            let botonEditar = document.createElement('a');
            botonEditar.href = '#'// path del html editar lab
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');


            botonEditar.dataset._id = listaCursos[i]['_id'];

            botonEditar.addEventListener('click', buscar_por_curso_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar');
                popup.style.display = "block";
                let titulo;
                titulo = document.getElementById('h1');
                titulo.innerHTML = 'Modificar cursos';
            });

            celdaOpciones.appendChild(botonEditar);


            // boton eliminar
            let botonEliminar = document.createElement('a');
            botonEliminar.href = '#'//evento  eliminar lab
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.addEventListener('click', remover_curso);
            
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


///////////////////Registrar
const botonRegistrar = document.querySelector('#btn_Registrar');
const botonActualizar = document.querySelector('#btn_Actualizar');  
let popup;
botonActualizar.hidden = true;

botonRegistrar.addEventListener('click', obtenerDatosCursos);
botonActualizar.addEventListener('click', obtenerCursosActualizar);

const inputNombreCurso = document.querySelector('#txtNombreCurso');
const inputCodigoCurso = document.querySelector('#txtCodigoCurso');
const inputCreditosCurso = document.querySelector('#numCreditosCurso');
const inputCostoCurso = document.querySelector('#numCostoCurso');
const inputIdCurso = document.querySelector('#txtId');

let sNombreCurso = '';
let sCodigoCurso = '';
let nCreditosCurso = 0;
let nCostoCurso = 0;
let sIdCurso = '';

function obtenerDatosCursos() {
    let aInfoCursos = [];
    let bError = false;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    nCreditosCurso = Number(inputCreditosCurso.value);
    nCostoCurso = Number(inputCostoCurso.value);
    sIdCurso = inputIdCurso.value;

    aInfoCursos.push(sIdCurso, sNombreCurso, sCodigoCurso, nCreditosCurso, nCostoCurso);

    bError = validarCursos();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el curso, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El curso se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        registrarCurso(aInfoCursos);
        limpiarFormulario();
    }
};
function obtenerCursosActualizar() {
    let aInfoCursos = [];
    let bError = false;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    nCreditosCurso = Number(inputCreditosCurso.value);
    nCostoCurso = Number(inputCostoCurso.value);
    sIdCurso = inputIdCurso.value;

    aInfoCursos.push(sIdCurso, sNombreCurso, sCodigoCurso, nCreditosCurso, nCostoCurso);

    bError = validarCursos();
    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar el curso, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcto',
            text: 'El curso se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        actualizarCurso(aInfoCursos);
        limpiarFormulario();
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
    }

};

function validarCursos() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('required');
    let costo_maximo = 500000;
    let credito_maximo = 10;
    let regexSoloLetras = /^[a-z A-Z-áéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexCodigo = /^[a-zA-Z0-9-]+$/;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    nCreditosCurso = inputCreditosCurso.value;
    nCostoCurso = inputCostoCurso.value;


    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };
    /*Validacion para el nombre del curso */
    if (regexSoloLetras.test(sNombreCurso) == false) {
        inputNombreCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputNombreCurso.classList.remove('errorInput');
    }
    /*Validacion para el codigo del curso */
    if (regexCodigo.test(sCodigoCurso) == false) {
        inputCodigoCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputCodigoCurso.classList.remove('errorInput');
    }
    /*Validacion para el costo de la curso*/
    if (regexSoloNumeros.test(nCostoCurso) == false && nCostoCurso <= costo_maximo) {
        inputCostoCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputCostoCurso.classList.remove('errorInput');
    }
    /*Validacion para los creditos del curso*/
    if (regexCodigo.test(nCreditosCurso) == false && nCreditosCurso <= credito_maximo) {
        inputCreditosCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputCreditosCurso.classList.remove('errorInput');
    }
    return bError;
};

function limpiarFormulario() {

    inputNombreCurso.value = '';
    inputCodigoCurso.value = '';
    inputCreditosCurso.value = '';
    inputCostoCurso.value = '';
    inputIdCurso.value = '';
};

function buscar_por_curso_id() {

    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let listaCursos = buscar_curso_id(_id);

    inputNombreCurso.value = listaCursos['nombre_curso'];
    inputCodigoCurso.value = listaCursos['codigo_curso'];
    inputCostoCurso.value = listaCursos['costo_curso'];
    inputCreditosCurso.value = listaCursos['creditos_curso'];
    inputIdCurso.value = listaCursos['_id'];
};

function remover_curso() {
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
            eliminarCurso(_id);
            listaCursos = obtenerCursos();
            mostrarListaCursos();
            swal(
                'Eliminado!',
                'El curso ha sido eliminado con éxito',
                'success'
            )
        }
    });

};

// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
    let titulo;
    titulo = document.getElementById('h1');
    titulo.innerHTML = 'Registrar cursos';
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