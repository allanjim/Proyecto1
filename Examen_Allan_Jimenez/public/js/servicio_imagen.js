let imagenUrl = '';

$(function() {

    $.cloudinary.config({ cloud_name: 'allanjimrod1', api_key: '455654255442863'});

    let uploadButton = $('#btnSeleccionarImagen');

    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'allanjimrod1', upload_preset: 'eqidialq'},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            
            imagenUrl = processImage(id);
            console.log(imagenUrl);
            document.querySelector('#txtImagen').src = imagenUrl;
            return imagenUrl;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}

