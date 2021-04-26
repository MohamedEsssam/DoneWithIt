const sql = require("../startup/connectDB");
const { generateId, validId } = require("./utils");

class MessageServices {
  constructor(ChatServices) {
    this.ChatServices = ChatServices;
  }

  async getMessages(chatId) {
    const query =
      "SELECT BIN_TO_UUID(messageId) messageId, text, sentDate, BIN_TO_UUID(chatId) chatId, BIN_TO_UUID(senderId) senderId FROM message JOIN chat USING(chatId) WHERE chatId = UUID_TO_BIN(?) ORDER BY sentDate ASC ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [chatId], (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }

  async sendMessage(text, senderId, receiverId) {
    const chat = await this.ChatServices.createOrGetChat(senderId, receiverId);
    if (!chat) return;

    const messageId = await generateId();
    const chatId = chat.chatId;

    if (!validId(senderId) || !validId(receiverId) || !validId(messageId))
      return;

    const query =
      "INSERT INTO message (messageId, text, sentDate, chatId) VALUES (UUID_TO_BIN(?), ?, NOW(), UUID_TO_BIN(?));";
    sql.query(query, [messageId, text, chatId]);

    return await this.getMessageById(messageId);
  }

  /*******************************************************************
   *                     Helper Methods                              *
   ******************************************************************/
  async getMessageById(messageId) {
    const query =
      "SELECT BIN_TO_UUID(messageId) AS messageId, text, sentDate, BIN_TO_UUID(chatId) AS chatId  FROM message WHERE messageId = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      sql.query(query, [messageId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }
}
module.exports = MessageServices;
