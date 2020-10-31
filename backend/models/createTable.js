const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS user; CREATE TABLE user (userId BINARY(16) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL CHECK(LENGTH(password)>3))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
