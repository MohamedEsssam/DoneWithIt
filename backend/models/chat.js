const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS chat; CREATE TABLE chat (chatId BINARY(16) NOT NULL PRIMARY KEY, createdAt DATETIME NOT NULL, senderId BINARY(16) NOT NULL, receiverId BINARY(16) NOT NULL, CONSTRAINT fk_senderId FOREIGN KEY (senderId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_receiver FOREIGN KEY (receiverId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
