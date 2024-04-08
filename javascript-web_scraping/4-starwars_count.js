#!/usr/bin/node

const request = require("request");

// Obtener la URL de la API de la línea de comandos
const apiUrl = process.argv[2];

// Verificar si se proporcionó una URL
if (!apiUrl) {
  console.error("Error: Debes proporcionar la URL de la API de Star Wars.");
  process.exit(1);
}

// ID del personaje "Wedge Antilles"
const characterId = "18";

// Realizar la solicitud GET a la API de Star Wars
request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  // Convertir la respuesta a formato JSON
  const films = JSON.parse(body);

  // Filtrar las películas donde el personaje "Wedge Antilles" está presente
  const moviesWithWedge = films.results.filter((film) =>
    film.characters.includes(
      `https://swapi-api.hbtn.io/api/people/${characterId}/`
    )
  );

  // Imprimir el número de películas donde "Wedge Antilles" está presente
  console.log(moviesWithWedge.length);
});
