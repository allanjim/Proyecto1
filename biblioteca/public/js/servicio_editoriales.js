'use strict';



let listaEditoriales = [
    ['Salamandra', 'España'],
    ['DeBolsillo', 'Honduras'],
    ['Norma', 'Costa Rica']
];

let registrar_editorial = function registrar_editorial(psEditorial, psPais) {
    $.ajax({
        url: 'http://localhost:4000/api/registrar_editorial',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            nombre : psEditorial,
            pais : psPais
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            //listaEditoriales = response;
            //return listaEditoriales;
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
};


async function listar_editoriales() {
    try {
      const response = await axios.get('http://localhost:4000/api/listar_editoriales');
      console.log(response);
      return response;
    } catch (error) {
      //console.error(error);
    }
  }