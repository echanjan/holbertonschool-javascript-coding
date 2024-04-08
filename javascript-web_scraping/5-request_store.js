#!/usr/bin/node
// Loripsum

const request = require("request");
const fs = require("fs");
const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.log("Ingrea un URL y un archivo de destino");
  process.exit(1);
}

request(url, function (err, response, body) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  if (response.statusCode === 200) {
    fs.writeFile(filePath, body, "utf-8", function (err) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    console.log(`Error: ${response.statusCode}`);
  }
});
