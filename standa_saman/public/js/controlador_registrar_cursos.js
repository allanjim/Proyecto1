'use strict';

let botonRegistrar = document.querySelector('#btn_Registrar');
botonRegistrar.addEventListener('click', obtenerCursos);

let inputNombreCurso = document.querySelector('#txtNombreCurso');
let inputCodigoCurso = document.querySelector('#txtCodigoCurso');
let inputCarreraCurso = document.querySelector('#txtCarreraCurso');
let inputCreditosCurso = document.querySelector('#numCreditosCurso');
let inputCostoCurso = document.querySelector('#numCostoCurso');
let inputSedeCurso = document.querySelector('#txtSedeCurso');
let inputRequisitoCurso = document.querySelector('#txtRequisitoCurso');

let sNombreCurso = '';
let sCodigoCurso = '';
let sCarreraCurso = '';
let nCreditosCurso = 0;
let nCostoCurso = 0;
let sSedeCurso = '';
let sRequisitoCurso = '';


function obtenerCursos() {
    let aInfoCursos = [];
    let bError = false;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    sCarreraCurso = inputCarreraCurso.value;
    nCreditosCurso = Number(inputCreditosCurso.value);
    nCostoCurso = Number(inputCostoCurso.value);
    sRequisitoCurso = inputRequisitoCurso.value;
    sSedeCurso = inputSedeCurso.value;

    aInfoCursos.push(sNombreCurso, sCodigoCurso, sCarreraCurso, sSedeCurso, nCreditosCurso, nCostoCurso, sRequisitoCurso);
    
    bError = validarCursos();
    if (bError == true) {
        swal({
            title: 'No se pudo registrar el curso',
            text: 'Por favor revise los espacios marcados en rojo',
            type: 'Warning',
            confirmButtonText: 'Entendido'
        });
    } else {    
            registrarCurso(aInfoCursos);
            swal({
                title: 'Registro exitoso',
                text: 'El registro fue completado correctamente',
                type: 'Sucess',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
        }
};

function validarCursos() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('required');
    let regexSoloLetras = /^[a-z A-Z-áéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexCodigo = /^[a-zA-Z0-9-]+$/;

    sNombreCurso = inputNombreCurso.value;
    sCodigoCurso = inputCodigoCurso.value;
    sCarreraCurso = inputCarreraCurso.value;
    nCreditosCurso = inputCreditosCurso.value;
    nCostoCurso = inputCostoCurso.value;
    sSedeCurso = inputSedeCurso.value;
    sRequisitoCurso = inputRequisitoCurso.value;


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
    /*Validacion para el nombre de la sede */
    if (regexSoloLetras.test(sSedeCurso) == false) {
        inputSedeCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputSedeCurso.classList.remove('errorInput');
    }
    /*Validacion para el codigo del curso */
    if (regexCodigo.test(sCodigoCurso) == false) {
        inputCodigoCurso.classList.add('errorInput');
        bError = true;
    } else {
        inputCodigoCurso.classList.remove('errorInput');
    }
    /*Validacion para el codigo del curso*/
    if (regexCodigo.test(sCarreraCurso) == false) {
        inputCarreraCurso.classList.add('errorInput');
        bError = true;
    }else {
        inputCarreraCurso.classList.remove('errorInput');
    }
    /*Validacion para los requisitos del curso */
    if (regexSoloLetras.test(sRequisitoCurso) == false) {
        inputRequisitoCurso.classList.add('errorInput');
        bError = true;
    }else {
        inputRequisitoCurso.classList.remove('errorInput');
    }
    /*Validacion para el costo de la curso*/
    if (regexSoloNumeros.test(nCostoCurso) == false) {
        inputCostoCurso.classList.add('errorInput');
        bError = true;
    }else {
        inputCostoCurso.classList.remove('errorInput');
    }
    /*Validacion para los creditos del curso*/
    if (regexCodigo.test(nCreditosCurso) == false) {
        inputCreditosCurso.classList.add('errorInput');
        bError = true;
    }else {
        inputCreditosCurso.classList.remove('errorInput');
    }
    return bError;
};

function limpiarFormulario() {

    inputNombreCurso.value = '';
    inputCodigoCurso.value = '';
    inputCarreraCurso.value = '';
    inputCreditosCurso.value = 0;
    inputCostoCurso.value = 0;
    inputSedeCurso.value = '';
    inputRequisitoCurso.value = '';
}