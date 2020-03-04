$(document).ready(function() {
  Swal.fire({
    title: "¡Atrapa tu Pokemon!",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Buscar",
    showLoaderOnConfirm: true,
    preConfirm: param => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${param}`)
        .then(response => {
          return response.json();
        })

        .catch(error => {
          Swal.showValidationMessage(`El pokemon que buscas no existe`);
        });
    }
  }).then(result => {
    console.log("result", result);
    Swal.fire({
      title: `${result.value.name}'s avatar`,
      imageUrl: result.value.sprites.front_shiny
    });
  });

  //capturando container donde se imprimirán los datos del pokemón requerido.
  let datos = $("#datos");
});
