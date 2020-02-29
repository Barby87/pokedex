$(document).ready(function() {
    // Declarar función con parámetros para obtener datos
    function obtenerDatos(){
        return $('#namePokemon').val();
    }

    // $('.btnBuscar').click(function() {
    $('#btnBuscar').click(function() {
        
        // Obtener el valor del pokemon ingresado por el usuario
          
        let datos = $('#datos');

        $.ajax({
            type: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/{id}",
            data: "json",
            success: function (response) {
                console.log(response);
                $.each(response.results , function(index, element) {
                    if(obtenerDatos() === element.name) {
                        datos.append('<p>Mi pokemon es ' + element.name + '</p>');
                    }
                });
            },

            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });
    });
        
});
