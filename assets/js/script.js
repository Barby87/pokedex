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
  preConfirm: function(param) {
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
    title: `${result.value.name}`,
    imageUrl: result.value.sprites.front_shiny
  });

  $(document).ready(function() {
    
    // Capturando containers donde se imprimirán los datos del pokemón requerido.
    // let datos = $("#datos");
    let info = $("#info");

    // Creando los divs que contienen los sprites y añadiendo dinamicamente desde la api el valor del "src" de las imagenes que albergan.

    let sprite1 = `<img src="${result.value.sprites.front_shiny}" class="img img_pokemon2" alt="Imagen parte frontal">`;

    let sprite2 = `<img src="${result.value.sprites.back_shiny}" class="img img_pokemon1" alt="Imagen parte trasera">`;

    // Añadiendo a las imágenes los <div> con su respectivo id.
    $("#img1").append(sprite1);
    $("#img2").append(sprite2);

    // Añadiendo nombre del pokemon al div 'datos'.
    info.append(
      `<h1 class='text-uppercase font-weight-bold pb-3'>${result.value.name}</h1>`
    );

    // Añadiendo habilidades.
    info.append("<h5> Habilidades:</h5>");
    info.append('<ul id="skills"</ul>');
    console.log("result.abilities", result.value.abilities);

    // Iterando habilidades para luego añadirlas como una lista.
    $.each(result.value.abilities, function(index, element) {
      $("#skills").append(
        `<li class="skill text-capitalize">Habilidad ${index + 1}: <strong> ${
          element.ability.name
        }</strong></li>`
      );
    });

    let typesArray = result.value.types;

    info.append("<h5>Tipo:</h5>");
    info.append('<ul id="types"</ul>');

    $.each(typesArray, function(index, element) {
      $("#types").append(
        `<li class="tipo text-capitalize"><strong>${element.type.name}</strong></li>`
      );
    });

    // Obteniendo altura del pokemon.
    info.append(`<h5>Altura: </h5>`);

    info.append(`<ul><li>${result.value.height / 10} m</li></ul>`);

    // Obteniendo peso del pokemon.
    info.append(`<h5>Peso: </h5>`);
    info.append(`<ul><li>${result.value.weight / 10} kg</ul></li>`);

    /******Gráfico****** */
    $("#myChart").append('<ul id="stats">Stats</ul>');
    let stats = result.value.stats;
    console.log("stats", result.value.stats);

    let arrStats = [];

    let arrBaseStats = [];
    
    $.each(stats, function(i, element) {
      console.log("stat", stats[i].stat.name);
      
      arrStats.push(stats[i].stat.name);
      arrBaseStats.push(stats[i].base_stat);
     
    });
    console.log('arrStats', arrStats);
    console.log('arrBaseStats', arrBaseStats);

    // console.log('element', element);

    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: arrStats,
        datasets: [
          {
            label: "Estadísticas",
            data: arrBaseStats,

            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)"
            ],
            borderColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Valores'
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],

          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Estadísticas'
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
});
