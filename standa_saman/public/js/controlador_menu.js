'use strict';
// Utilizando jquery, hago que el menu cambie si display al presionar el boton
$("#btnMenu").click(function(){
    if($("#menu").css("display") === 'none'){
        $("#menu").fadeIn("slow");
    }else if($("#menu").css("display") === 'block'){
        $("#menu").fadeOut("slow");
    }
});