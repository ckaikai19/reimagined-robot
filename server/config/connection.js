const mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user_managment",
});


module.exports = connection;