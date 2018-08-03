'use strict';

mostrarListaSolicitudes();

let botonBuscar = document.querySelector('#btnBuscar');
let inputBuscar = document.querySelector('#txtBusqueda');
let listaSolicitudes = obtenerSolicitud();
botonBuscar.addEventListener('click', function () {
    let busqueda = inputBuscar.value;
    mostrarListaSolicitudes(busqueda);
});

function mostrarListaSolicitudes(paBuscar) {
    let listaSolicitudes = obtenerSolicitud();

    let tbody = document.querySelector('section table tbody');
    tbody.innerHTML = '';
    if (paBuscar != undefined) {
        for (let i = 0; i < listaSolicitudes.length; i++) {
            if (listaSolicitudes[i]['profesor_solicitud'].toLowerCase().includes(paBuscar.toLowerCase())) {
                let fila = tbody.insertRow();

                let cProfesor_solicitud = fila.insertCell();
                let cCarrera_solicitud = fila.insertCell();
                let cPeriodo_solicitud = fila.insertCell();
                let cGrupo_solicitud = fila.insertCell();
                let cNombre_solicitud = fila.insertCell();
                let cCedula_solicitud = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                cProfesor_solicitud.innerHTML = listaSolicitudes[i]['profesor_solicitud'],
                cCarrera_solicitud.innerHTML = listaSolicitudes[i]['carrera_solicitud'],
                cPeriodo_solicitud.innerHTML = listaSolicitudes[i]['periodo_solicitud'],
                cGrupo_solicitud.innerHTML = listaSolicitudes[i]['grupo_solicitud'],
                cNombre_solicitud.innerHTML = listaSolicitudes[i]['nombre_solicitud'],
                cCedula_solicitud.innerHTML = listaSolicitudes[i]['cedula_solicitud']

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

                botonEliminar.dataset._id = listaSolicitudes[i]['_id'];

                botonEliminar.addEventListener('click', remover_solicitud);
    
                celdaOpciones.appendChild(botonEliminar);

                celdaOpciones.appendChild(botonEliminar);

                // Icono de editar: <i class="fas fa-cogs"></i>
                // Icono de eliminar: <i class="fas fa-trash-alt"></i>
            }
        }
    }

    else {
        for (let i = 0; i < listaSolicitudes.length; i++) {
            let fila = tbody.insertRow();

            let cProfesor_solicitud = fila.insertCell();
            let cCarrera_solicitud = fila.insertCell();
            let cPeriodo_solicitud = fila.insertCell();
            let cGrupo_solicitud = fila.insertCell();
            let cNombre_solicitud = fila.insertCell();
            let cCedula_solicitud = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            cProfesor_solicitud.innerHTML = listaSolicitudes[i]['profesor_solicitud'],
            cCarrera_solicitud.innerHTML = listaSolicitudes[i]['carrera_solicitud'],
            cPeriodo_solicitud.innerHTML = listaSolicitudes[i]['periodo_solicitud'],
            cGrupo_solicitud.innerHTML = listaSolicitudes[i]['grupo_solicitud'],
            cNombre_solicitud.innerHTML = listaSolicitudes[i]['nombre_solicitud'],
            cCedula_solicitud.innerHTML = listaSolicitudes[i]['cedula_solicitud']

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

            botonEliminar.dataset._id = listaSolicitudes[i]['_id'];

            botonEliminar.addEventListener('click', remover_solicitud);

            celdaOpciones.appendChild(botonEliminar);

            celdaOpciones.appendChild(botonEliminar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }
    }

};

function remover_solicitud(){
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