let botonRegistrar = document.querySelector('#btnAgregar');
let selectEntrenadores = document.querySelector('#sltEntrenador');
let select_pokemon = document.querySelector('#sltPokemon');

botonRegistrar.addEventListener('click', obtenerDatos);
listarEntrenadores();
listarPokemones();

function obtenerDatos() {
    let bError = false;

    let id = selectEntrenadores.value;
    let spokemon = select_pokemon.value;

    bError = validarDatos();
    if (bError == true) {
        swal({
            title: 'Asociación incorrecta',
            text: 'No se pudo hacer la asociación, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Asociación correcto',
            text: 'Asociación se completó de manera correcta.',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        agregarPokemon(id, spokemon);
    }

}
function listarEntrenadores() {
    let entrenadores = obtenerListaEntrenador();
    for (let i = 0; i < entrenadores.length; i++) {
        let opcion = new Option(entrenadores[i]['nombre_entrenador'])
        opcion.value = entrenadores[i]['_id'];

        selectEntrenadores.options.add(opcion);

    }
};

function validarDatos() {
    let bError = false;

    if (selectEntrenadores.value == '') {
        bError = true;
        selectEntrenadores.classList.add('errorInput');
    } else {
        selectEntrenadores.classList.remove('errorInput');
    }

    if (select_pokemon.value == '') {
        bError = true;
        select_pokemon.classList.add('errorInput');
    } else {
        select_pokemon.classList.remove('errorInput');
    }

    return bError;
};
function listarPokemones() {
    let pokemones = obtenerListaPokemon();
    for (let i = 0; i < pokemones.length; i++) {
        let opcion = new Option(pokemones[i]['nombre_pokemon'])
        opcion.value = pokemones[i]['_id'];

        select_pokemon.options.add(opcion);

    }
};