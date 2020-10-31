const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS listing; CREATE TABLE listing (listingId BINARY(16) NOT NULL PRIMARY KEY, title VARCHAR(50) NOT NULL, price VARCHAR(6) NOT NULL, category VARCHAR(25) NOT NULL, description VARCHAR(255) NOT NULL, CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
