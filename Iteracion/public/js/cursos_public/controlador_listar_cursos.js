'use strict';

mostrarListaCursos();


let inputBuscar = document.querySelector('#txtBusqueda');
let listaCursos = obtenerCursos();
inputBuscar.addEventListener('keyup', function () {

    mostrarListaCursos(inputBuscar.value);

});

function mostrarListaCursos(paBuscar) {
    debugger;
    let listaCursos = obtenerCursos();


    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
    if (paBuscar != undefined) {
        for (let i = 0; i < listaCursos.length; i++) {
            if (listaCursos[i]['nombre_curso'].toLowerCase().includes(paBuscar.toLowerCase())) {
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

                celdaOpciones.appendChild(botonEditar);


                // boton eliminar
                let botonEliminar = document.createElement('a');
                botonEliminar.href = '#'//evento  eliminar lab
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');

                celdaOpciones.appendChild(botonEliminar);

                // Icono de editar: <i class="fas fa-cogs"></i>
                // Icono de eliminar: <i class="fas fa-trash-alt"></i>
            }
        }
    }


    else {
        for (let i = 0; i < listaCursos.length; i++) {
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
            botonEditar.href = '../html/registrar_cursos.html'// path del html editar lab
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');


            botonEditar.dataset._id = listaCursos[i]['_id'];
            botonEditar.addEventListener('click', buscar_curso_id);
            celdaOpciones.appendChild(botonEditar);


            // boton eliminar
            let botonEliminar = document.createElement('a');
            botonEliminar.href = '#'//evento  eliminar lab
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');


            botonEliminar.dataset._id = listaCursos[i]['_id'];

            botonEliminar.addEventListener('click', remover_usuario);

            celdaOpciones.appendChild(botonEliminar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }

    };
    
};

function remover_usuario() {
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
