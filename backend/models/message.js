const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS message; CREATE TABLE message (messageId BINARY(16) NOT NULL PRIMARY KEY, text VARCHAR(255) NOT NULL, sentDate DATETIME NOT NULL, chatId BINARY(16) NOT NULL, CONSTRAINT fk_chatId FOREIGN KEY (chatId) REFERENCES chat(chatId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
