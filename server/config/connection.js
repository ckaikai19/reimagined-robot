const mysql = require("mysql2");

let db_config = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b63e74f7fdad8c",
  password: "d8e9d09a",
  database: "heroku_4741640f23249ef",
});


//mysql://bb613233b746e0:5746ff44@us-cdbr-east-06.cleardb.net/heroku_f52866be0c962a0?reconnect=true

//mysql://b63e74f7fdad8c:d8e9d09a@us-cdbr-east-06.cleardb.net/heroku_4741640f23249ef?



module.exports = db_config;