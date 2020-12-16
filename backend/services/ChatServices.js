const sql = require("../startup/connectDB");
const { generateId, validId } = require("./utils");

class ChatService {
  async getChat(senderId, receiverId) {
    const query =
      "SELECT BIN_TO_UUID(chatId) chatId, createdAt, BIN_TO_UUID(senderId) senderId,BIN_TO_UUID(receiverId) receiverId FROM chat WHERE (senderId = UUID_TO_BIN(?) AND receiverId = UUID_TO_BIN(?)) OR (senderId = UUID_TO_BIN(?) AND receiverId = UUID_TO_BIN(?)) ORDER BY createdAt DESC ;";

    return new Promise((resolve, reject) => {
      sql.query(
        query,
        [senderId, receiverId, receiverId, senderId],
        (err, result, field) => {
          if (err) throw err;

          resolve(result[0]);
        }
      );
    });
  }

  async createOrGetChat(senderId, receiverId) {
    const chat = await this.getChat(senderId, receiverId);
    if (chat) return chat;

    const chatId = await generateId();

    if (!validId(senderId) || !validId(receiverId) || !validId(chatId)) return;

    const query =
      "INSERT INTO chat (chatId, createdAt, senderId, receiverId) VALUES (UUID_TO_BIN(?), NOW(), UUID_TO_BIN(?), UUID_TO_BIN(?));";
    sql.query(query, [chatId, senderId, receiverId]);
    return await this.getChatById(chatId);
  }

  async deleteChat() {}

  /*******************************************************************
   *                     Helper Methods                              *
   ******************************************************************/
  async getChatById(chatId) {
    const query =
      "SELECT BIN_TO_UUID(chatId) chatId, createdAt, BIN_TO_UUID(senderId) senderId,BIN_TO_UUID(receiverId) receiverId FROM chat WHERE chatId = UUID_TO_BIN(?) ORDER BY createdAt DESC ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [chatId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }
}

module.exports = ChatService;
