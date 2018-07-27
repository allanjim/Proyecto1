'use strict';

mostrar_editoriales();
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputEditorial = document.querySelector('#txtNombreEditorial');
let inputPais = document.querySelector('#txtPais');

botonRegistrar.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
    let sEditorial = inputEditorial.value;
    let sPais = inputPais.value;

    registrar_editorial(sEditorial, sPais);
    mostrar_editoriales();
};

async function mostrar_editoriales(){
    
    try {
        //const lista_editoriales = await axios.get('http://localhost:4000/api/listar_editoriales');
        const lista_editoriales = await listar_editoriales();
        let tbody = document.querySelector('#tblEditoriales tbody');
        tbody.innerHTML = '';
    
        for(let i = 0; i < lista_editoriales.data.length; i++){
            let fila = tbody.insertRow();
    
            let celdaEditorial = fila.insertCell();
            let celdaPais = fila.insertCell();
    
            celdaEditorial.innerHTML = lista_editoriales.data[i]['nombre'];
            celdaPais.innerHTML = lista_editoriales.data[i]['pais'];
        }
      } catch (error) {
        console.error(error);
      }

    
    

};