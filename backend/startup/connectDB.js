const mysql = require("mysql");
const config = require("config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: config.get("mysqlPass"),
  database: config.get("dbName"),
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) throw error;

  console.log("Connected successfully to database...!");
});

module.exports = connection;
