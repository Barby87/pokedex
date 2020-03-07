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
    // Capturando container donde se imprimirán los datos del pokemón requerido.

    let datos = $("#datos");

    let carrusel =
      '<div id="carouselExampleSlidesOnly" class="carousel slide"><div class="carousel-inner"></div></div>';

    // Asignando el carrusel al div "datos"

    datos.append(carrusel);

    // Creando los divs que contienen los sprites y añadiendo dinamicamente desde la api el valor del "src" de las imagenes que albergan.

    let sprite1 = `<div class="carousel-item active"><img src='${result.value.sprites.back_default}' class="d-block w-20"></div>`;

    let sprite2 = `<div class="carousel-item active"><img src='${result.value.sprites.back_shiny}' class="d-block w-20"></div>`;

    let sprite3 = `<div class="carousel-item active"><img src='${result.value.sprites.front_default}' class="d-block w-20"></div>`;

    let sprite4 = `<div class="carousel-item active"><img src='${result.value.sprites.front_shiny}' class="d-block w-20"></div>`;

    // Añadiendo las imagenes (sprites) al carousel arriba creado.
    $(".carousel-inner").append(sprite1);
    $(".carousel-inner").append(sprite2);
    $(".carousel-inner").append(sprite3);
    $(".carousel-inner").append(sprite4);

    // Arrancando el carrusel (con función de Bootstrap).
    $(".carousel").carousel();

    // Añadiendo nombre del pokemon al div 'datos'.
    datos.append(
      //   `<p class='text-capitalize>Nombre: <strong>${result.value.name}</strong></p>`
      `<p class='text-uppercase font-weight-bold'>${result.value.name}</p>`
    );

    // Añadiendo habilidades.
    datos.append("<p> Habilidades:</p>");
    datos.append('<ul id="skills"</ul>');
    console.log("result.abilities", result.value.abilities);

    // Iterando habilidades para luego añadirlas como una lista.
    $.each(result.value.abilities, function(index, element) {
      $("#skills").append(
        `<li class="skill">Habilidad ${index + 1}: <strong> ${
          element.ability.name
        }</strong></li>`
      );
    });

    let typesArray = result.value.types;

    datos.append("<p>Tipo:</p>");
    datos.append('<ul id="types"</ul>');

    $.each(typesArray, function(index, element) {
      $("#types").append(
        `<li class="tipo text-capitalize"><strong>${element.type.name}</strong></li>`
      );
    });

    // Obteniendo altura del pokemon.
    datos.append(`<p> Peso: ${result.value.height / 10} m</p>`);

    // Obteniendo peso del pokemon.
    datos.append(`<p> Peso: ${result.value.weight / 10} kg</p>`);

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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
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
