#!/usr/bin/node

const request = require("request");
const URL = process.argv[2];

if (!URL) {
  console.log("Debe proporcionar un URL");
  process.exit(1);
}

request(url, function (err, response) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`code: ${response.statusCode}`);
});
