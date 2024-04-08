#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Error: Debes proporcionar la URL de la API de Star Wars.');
  process.exit(1);
}

const characterId = '18';

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const films = JSON.parse(body);

  const moviesWithWedge = films.results.filter((film) =>
    film.characters.includes(
      `https://swapi-api.hbtn.io/api/people/${characterId}/`
    )
  );

  console.log(moviesWithWedge.length);
});
