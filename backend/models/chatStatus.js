const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS chatStatus; CREATE TABLE chatStatus (chatStatusId BINARY(16) NOT NULL PRIMARY KEY, status ENUM('visible', 'invisible', 'deleted') DEFAULT 'visible' NOT NULL, chatId BINARY(16) NOT NULL, userId BINARY(16) NOT NULL, CONSTRAINT fk_chat FOREIGN KEY (chatId) REFERENCES chat(chatId) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
