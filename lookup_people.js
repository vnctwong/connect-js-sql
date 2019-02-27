const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});
// console.log(client);
// console.log('~~~~~~~~~');

const argv = process.argv[2];
const sql = `SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE '%${argv}%' OR last_name LIKE '%${argv}%'`


function resToString(arry) {
  arry.forEach(function (row, i) {
    console.log('-' + (i + 1) + ' :' + row.first_name + ` ${row.last_name}` + ',' + ' born ' + row.birthdate.toISOString().slice(0, 10));

  });
}

client.connect((err) => {
  console.log('Searching ...');
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(sql, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result.rows);

    resToString(result.rows);

    client.end();
  });

});