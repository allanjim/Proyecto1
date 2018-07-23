let botonRegistrar = document.querySelector('#btnAgregar');
let selectEntrenadores = document.querySelector('#sltEntrenador');
let select_pokemon = document.querySelector('#sltPokemon');

botonRegistrar.addEventListener('click', obtenerDatos);
listarEntrenadores();
listarPokemones();

function obtenerDatos(){

    let id = selectEntrenadores.value;
    let spokemon = select_pokemon.value;


    agregarPokemon(id, spokemon);
}
function listarEntrenadores(){
    let entrenadores = obtenerListaEntrenador();
    for(let i = 0; i < entrenadores.length; i++){
        let opcion = new Option(entrenadores[i]['nombre_entrenador'])
        opcion.value = entrenadores[i]['_id'];
        
        selectEntrenadores.options.add(opcion);
    
    }
};
function listarPokemones(){
    let pokemones = obtenerListaPokemon();
    for(let i = 0; i < pokemones.length; i++){
        let opcion = new Option(pokemones[i]['nombre_pokemon'])
        opcion.value = pokemones[i]['_id'];
        
        select_pokemon.options.add(opcion);
    
    }
};