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

// function resToString(arry) {
//   arry.forEach(function (row, i) {
//     console.log('-' + (i + 1) + ' :' + row.first_name + ` ${row.last_name}` + ',' + ' born ' + row.birthdate.toISOString().slice(0, 10));

//   });
// }

//search famous_people with knex syntax and print

// function searchPpl(name) {

knex.select('*')
  .from('famous_people')
  .where('first_name', process.argv[2])
  .orWhere('last_name', process.argv[2])
  .asCallback(function (err, rows) {
    if (err) return console.error(err);
    console.log(rows);
    knex.destroy();
  });
// knex.destroy();