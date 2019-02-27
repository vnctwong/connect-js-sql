const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
  }
});

let first_name = process.argv[2];
let last_name = process.argv[3];
let birthdate = process.argv[4];

function insertRow(first_name, last_name, birthdate) {

  knex('famous_people')
    .insert({
      first_name: process.argv[2],
      last_name: process.argv[3],
      birthdate: process.argv[4]
    })
    .catch((err) => {
      throw err;
    })
    .finally(function () {
      knex.destroy();
    });
}

insertRow(first_name, last_name, birthdate);