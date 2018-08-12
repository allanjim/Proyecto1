'use strict';

mostrarListaCursos();
mostrarRequisitosAsociar();

let inputBuscar = document.querySelector('#txtBusqueda');
let listaCursos = obtenerCursos();
inputBuscar.addEventListener('keyup', function () {

    mostrarListaCursos(inputBuscar.value);

});

function mostrarListaCursos(pFiltro) {
    debugger;
    let listaCursos = obtenerCursos();
    let listaCarreras = obtenerListaCarreras();

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
            let cRequisitos_curso = fila.insertCell();
            let cEstado_curso = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            cNombre_curso.innerHTML = listaCursos[i]['nombre_curso'];
            cCodigo_curso.innerHTML = listaCursos[i]['codigo_curso'];
            cCosto_curso.innerHTML = numeroALetras(listaCursos[i]['costo_curso']);
            cEstado_curso.innerHTML = listaCursos[i]['estado_curso'];
            cCreditos_curso.innerHTML = listaCursos[i]['creditos_curso'];

            let aRequisitos = listaCursos[i]['requisitos_curso'];
            if (aRequisitos.length > 0 && aRequisitos != null) {

                let btnVerCursos = document.createElement('button');
                // Le asigna el name para darle los estilos
                btnVerCursos.name = 'btnTabla';
                btnVerCursos.dataset.nombre_curso = listaCursos[i]['nombre_curso'];
                // Esto le asigna un id al boton usando el codigo del curso
                btnVerCursos.id = 'btn' + listaCursos[i]['codigo_curso'];
                // Escribe en el boton
                btnVerCursos.textContent = 'Ver requisitos';


                // Por cada boton como evento, genera la informacion en tabla
                btnVerCursos.addEventListener('click', function () {


                    let listaRequisitosAsociados = [];
                    for (let j = 0; j < aRequisitos.length; j++) {
                        let infoRequisitoActual = [];
                        infoRequisitoActual.push(aRequisitos[j]['nombre_curso'], aRequisitos[j]['codigo_curso']);
                        listaRequisitosAsociados.push(infoRequisitoActual);
                    }

                    ppCursosAsociados.style.display = "block";
                    let tblCursos = document.querySelector('#tblRequisitos tbody');
                    mostrarListaRequisitos(listaRequisitosAsociados, tblCursos);
                    displayCursosScroll();

                });
                cRequisitos_curso.appendChild(btnVerCursos);
            } else {
                cRequisitos_curso.innerHTML = "-";
            }
            // boton  editar
            let botonEditar = document.createElement('span');
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
            let botonEliminar = document.createElement('span');
            botonEliminar.href = '#'//evento  eliminar lab
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset._id = listaCursos[i]['_id'];

            botonEliminar.addEventListener('click', remover_curso);

            celdaOpciones.appendChild(botonEliminar);

            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');

            botonAsociar.addEventListener('click', function () {
                ppAsociar.style.display = "block";
                ppAsociar.dataset.nombre_curso = listaCursos[i]['nombre_curso'];
                ppAsociar.dataset.codigo_curso = listaCursos[i]['codigo_curso'];
                ppAsociar.dataset._id = listaCursos[i]['_id'];
                btnAsociar.dataset._id = botonAsociar.dataset._id;

                let aCursos = document.querySelectorAll('#divRequisitoAsociar input[type=checkbox]');
                deselectOptions();
                let aRequisitos = getRequisitos(ppAsociar.dataset._id);

                if (aRequisitos.length > 0 && !null) {
                    for (let j = 0; j < aRequisitos.length; j++) {
                        // Compare los que tiene registrados con los cursos en la base de datos
                        for (let k = 0; k < aCursos.length; k++) {
                            if (aRequisitos[j] == aCursos[k].id) {
                                aCursos[k].checked = true;
                            }
                        }
                    }
                }
            });

            celdaOpciones.appendChild(botonAsociar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }
    }

};


///////////////////Registrar
const botonRegistrar = document.querySelector('#btn_Registrar');
const botonActualizar = document.querySelector('#btn_Actualizar');
const botonAsociar = document.querySelector('#btnAsociar');

let popup;
botonActualizar.hidden = true;

botonRegistrar.addEventListener('click', obtenerDatosCursos);
botonAsociar.addEventListener('click', obtenerDatosAsociar)
botonActualizar.addEventListener('click', obtenerCursosActualizar);

const inputNombreCurso = document.querySelector('#txtNombreCurso');
const inputCodigoCurso = document.querySelector('#txtCodigoCurso');
const inputCreditosCurso = document.querySelector('#numCreditosCurso');
const inputCostoCurso = document.querySelector('#numCostoCurso');
const inputIdCurso = document.querySelector('#txtId');
const selectEstado = document.querySelector('#sltEstado');
const selectCarrera = document.querySelector('#sltCarrera');

let sNombreCurso = '';
let sCodigoCurso = '';
let nCreditosCurso = 0;
let nCostoCurso = 0;
let sEstadoCurso = '';
let sIdCurso = '';

function obtenerDatosCursos() {
    let aInfoCursos = [];
    let bError = false;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    nCreditosCurso = Number(inputCreditosCurso.value);
    nCostoCurso = Number(inputCostoCurso.value);
    sEstadoCurso = selectEstado.value;
    sIdCurso = inputIdCurso.value;

    aInfoCursos.push(sIdCurso, sNombreCurso, sCodigoCurso, nCreditosCurso, nCostoCurso, sEstadoCurso);

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

function limpiarSubdocumentosRequisito(idCurso) {
    let infoCurso = buscar_curso_id(idCurso);
    for (let i = 0; i < infoCurso['requisitos_curso'].length; i++) {
        eliminarCursoRequisito(idCurso, infoCurso['requisitos_curso'][i]['_id']);
    }
};


function obtenerCursosActualizar() {
    let aInfoCursos = [];
    let bError = false;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    nCreditosCurso = Number(inputCreditosCurso.value);
    nCostoCurso = Number(inputCostoCurso.value);
    sEstadoCurso = selectEstado.value
    sIdCurso = inputIdCurso.value;

    aInfoCursos.push(sIdCurso, sNombreCurso, sCodigoCurso, nCreditosCurso, nCostoCurso, sEstadoCurso);

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
    let regexSoloLetras = /^[a-z A-Z-áéíóúÁÉÍÓÚñÑ0-9]+$/;
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
    if (regexSoloLetras.test(sEstadoCurso) == false) {
        selectEstado.classList.add('errorInput');
        bError = true;
    } else {
        selectEstado.classList.remove('errorInput');
    }
    return bError;
};

function limpiarFormulario() {

    inputNombreCurso.value = '';
    inputCodigoCurso.value = '';
    inputCreditosCurso.value = '';
    inputCostoCurso.value = '';
    selectEstado.value = '';
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
    selectEstado.value = listaCursos['estado_curso']
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
///////////// Asociar cursos a carreras

// function obtenerDatosAsociar() {

//     let requisitosElegidos = document.querySelectorAll('#divRequisitoAsociar input[type=checkbox]:checked');
//     let divRequisitoAsociar = document.querySelector('#divRequisitoAsociar');

//     let nombre_curso = ppAsociar.dataset.nombre_curso;
//     let codigo_curso = ppAsociar.dataset.codigo_curso;
//     let id_curso = ppAsociar.dataset._id;


//     if (requisitosElegidos.length > 0) {

//         if (requisitosElegidos.length > 0) {
//             for (let i = 0; i < requisitosElegidos.length; i++) {
//                 let infoCurso = getInfoCurso(requisitosElegidos[i].id);
//                 agregarRequisitoCurso(id_curso, infoCurso['nombre_curso'], infoCurso['codigo_curso']);
//             }
//         }
//         swal({
//             title: 'Asociación correcta',
//             text: 'La información se asoció correctamente',
//             type: 'success',
//             confirmButtonText: 'Entendido'
//         });
//         $('.swal2-confirm').click(function () {
//             reload();
//         });
//     } else {
//         ppAsociar.style.display = "none";
//     }
//     limpiarFormulario();
// };

function obtenerDatosAsociar() {

    swal({
        title: '¿Desea realizar estos cambios?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {

            let nombre_curso = ppAsociar.dataset.nombre_curso;
            let codigo_curso = ppAsociar.dataset.codigo_curso;
            let id_curso = ppAsociar.dataset._id;

            limpiarSubdocumentosRequisito(id_curso);

            let requisitosElegidos = document.querySelectorAll('#divRequisitoAsociar input[type=checkbox]:checked');

            if (requisitosElegidos.length > 0) {
                for (let i = 0; i < requisitosElegidos.length; i++) {
                    let infoCurso = getInfoCurso(requisitosElegidos[i].id);
                    agregarRequisitoCurso(id_curso, infoCurso['nombre_curso'], infoCurso['codigo_curso']);
                }
            }
            reload();
        }

    });
}
function getRequisitos(id_curso) {
    let infoCurso = buscar_curso_id(id_curso);
    let aCursos = [];
    for (let i = 0; i < infoCurso['requisitos_curso'].length; i++) {
        aCursos.push(infoCurso['requisitos_curso'][i]['nombre_curso']);
    }
    return aCursos;
};

function getInfoCurso(pCursoNombre) {
    let listaCurso = obtenerCursos();
    let informacionCurso = "";
    for (let i = 0; i < listaCurso.length; i++) {
        if (listaCurso[i]['nombre_curso'] == pCursoNombre) {
            let cursoId = listaCurso[i]['_id'];
            informacionCurso = buscar_curso_id(cursoId);
        }
    }
    return informacionCurso;
};
//funcion que llama los cursos
function mostrarRequisitosAsociar() {
    let divRequisitoAsociar = document.querySelector('#divRequisitoAsociar');
    let listaCursos = obtenerCursos();
    for (let i = 0; i < listaCursos.length; i++) {

        let newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = listaCursos[i]['nombre_curso'];

        let newLabel = document.createElement('label');
        newLabel.htmlFor = newInput.id;
        let newSpan = document.createElement('span');
        newSpan.textContent = listaCursos[i]['nombre_curso'];

        divRequisitoAsociar.appendChild(newInput);
        divRequisitoAsociar.appendChild(newLabel);
        newLabel.appendChild(newSpan);
    }

};

function mostrarListaRequisitos(pArreglo, tbody) {

    tbody.innerHTML = '';

    for (let i = 0; i < pArreglo.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaCodigo = fila.insertCell();

        let sNombreCurso = pArreglo[i][0];
        let sCodigoCurso = pArreglo[i][1];

        celdaNombre.innerHTML = sNombreCurso;
        celdaCodigo.innerHTML = sCodigoCurso;

    }
    $(".scroll").animate({ scrollTop: 0 }, "fast");
};

function displayCursosScroll() {
    let scrollTblCursos = document.querySelector('#div_tabla_cursos');
    let tblCursos = document.querySelector('#tblCursos');
    let alturaTablaCursos = tblCursos.scrollHeight;

    if (alturaTablaCursos < 250) {
        scrollTblCursos.classList.remove('scroll');
    } else {
        scrollTblCursos.classList.add('scroll');
    }
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

let ppRegistrar = document.querySelector('#sct_registrar');
let ppAsociar = document.querySelector('#sct_asociar');
let ppActualizar = document.querySelector('#sct_modificar');
let ppCursosAsociados = document.querySelector('#sct_cursos_requisitos');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});
// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormulario();
    }
    if (event.target == ppAsociar) {
        ppAsociar.style.display = "none";
        deselectOptions();
    }
    if (event.target == ppActualizar) {
        ppActualizar.style.display = "none";
        limpiarFormulario();
    }
    if (event.target == ppCursosAsociados) {
        ppCursosAsociados.style.display = "none";
    }
}
function clean() {
    popup.style.display = "none";
    limpiarFormulario();
};

function deselectOptions() {
    let selected = document.querySelectorAll('#sct_asociar input[type=checkbox]:checked');
    for (let i = 0; i < selected.length; i++) {
        selected[i].checked = false;
    }
};

function reload() {
    deselectOptions();
    mostrarListaCursos();
    limpiarFormulario();
    ppRegistrar.style.display = "none";
    ppAsociar.style.display = "none";
    ppActualizar.style.display = "none";
};
// Esto es para que despliegue el formulario