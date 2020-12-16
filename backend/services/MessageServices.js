const sql = require("../startup/connectDB");
const { generateId, validId } = require("./utils");

class MessageServices {
  constructor(ChatServices) {
    this.ChatServices = ChatServices;
  }

  async getMessages(senderId, receiverId) {
    const query =
      "SELECT BIN_TO_UUID(messageId) messageId, text, sentDate, BIN_TO_UUID(senderId) senderId,BIN_TO_UUID(receiverId) receiverId FROM message WHERE (senderId = UUID_TO_BIN(?) AND receiverId = UUID_TO_BIN(?)) OR (senderId = UUID_TO_BIN(?) AND receiverId = UUID_TO_BIN(?)) ORDER BY sentDate DESC ;";

    return new Promise((resolve, reject) => {
      sql.query(
        query,
        [senderId, receiverId, receiverId, senderId],
        (err, result, field) => {
          if (err) throw err;

          resolve(result);
        }
      );
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

  //TODO think for logic !!
  async deleteMessage(messageId, senderId, receiverId) {}

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
