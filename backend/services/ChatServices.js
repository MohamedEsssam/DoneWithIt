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
      "START TRANSACTION; INSERT INTO chat (chatId, createdAt, senderId, receiverId) VALUES (UUID_TO_BIN(?), NOW(), UUID_TO_BIN(?), UUID_TO_BIN(?)); INSERT INTO chatStatus (chatStatusId, chatId, userId) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), UUID_TO_BIN(?)), (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), UUID_TO_BIN(?)); COMMIT;";
    sql.query(query, [
      chatId,
      senderId,
      receiverId,
      chatId,
      senderId,
      chatId,
      receiverId,
    ]);
    return await this.getChatById(chatId);
  }

  //TODO think about how to delete from one side and still show on the other side until both delete
  async deleteChat(chatId, senderId, receiverId) {
    // 1- create new relation between user and chat
    // 2- chatStatus -> chatId, userId, status(display, archived, deleted)
    // 3- getAll chats for user that have status = display
    // 4- create task run everyday to check if there is chatId duplicated
    // 5- if found duplicated with status delete then delete this chat
    // 6- create transaction to delete chat and message
  }

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
