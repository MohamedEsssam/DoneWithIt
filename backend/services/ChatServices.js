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

  //TODO add update date for chat to re-arrange chats
  //TODO add read flag to message
  async getChats(userId) {
    const query =
      "SELECT DISTINCT BIN_TO_UUID(chatId) chatId, createdAt, BIN_TO_UUID(senderId) senderId,BIN_TO_UUID(receiverId) receiverId, cs.status, GROUP_CONCAT(CASE WHEN u.userId != UUID_TO_BIN(?) THEN u.name END ) AS callee, (SELECT DISTINCT (SELECT text FROM message WHERE sentDate = (SELECT (MAX(sentDate))FROM message WHERE chatId = c.chatId))FROM message) AS lastMessage FROM chat c JOIN chatStatus cs USING (chatId) JOIN user u ON c.receiverId = u.userId OR c.senderId = u.userId WHERE cs.userId = UUID_TO_BIN(?) AND cs.status='visible' GROUP BY chatId, createdAt, senderId, receiverId, c.chatId ORDER BY createdAt DESC; ";

    return new Promise((resolve, reject) => {
      sql.query(query, [userId, userId], (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
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

  async deleteChat(chatId, userId) {
    // 1- create new relation between user and chat
    // 2- chatStatus -> chatId, userId, status(visible, invisible, deleted) default visible
    // 3- for each delete -> update status column to deleted
    // 4- getAll chats that have 2 status = deleted
    // 5- create task run twice 12 hours to getAll chats that have 2 status = deleted
    // 6- create transaction to delete chat, chatStatus, and message

    const chat = this.getChatByIdAndUserId(chatId, userId);
    if (!chat) return;
    const query =
      "UPDATE chatStatus SET status = ? WHERE chatId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?)";
    sql.query(query, ["deleted", chatId, userId], (err, result, field) => {
      if (err) throw err;
    });

    return chat;
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

  async getChatByIdAndUserId(chatId, userId) {
    const query =
      "SELECT BIN_TO_UUID(chatId) chatId, createdAt, BIN_TO_UUID(senderId) senderId,BIN_TO_UUID(receiverId) receiverId FROM chat WHERE chatId = UUID_TO_BIN(?) AND (senderId = UUID_TO_BIN(?) OR receiverId = UUID_TO_BIN(?)) ORDER BY createdAt DESC ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [chatId, userId, userId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }

  async getDeletedChats() {
    const query =
      "SELECT BIN_TO_UUID(chatId) chatId FROM chatStatus WHERE status = 'deleted' GROUP BY chatId HAVING COUNT(chatId) = 2";

    return new Promise((resolve, reject) => {
      sql.query(query, (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }

  async deleteChatFromDB(chatId) {
    if (!chatId) return;

    const query =
      "START TRANSACTION; DELETE FROM message WHERE chatId = UUID_TO_BIN(?); DELETE FROM chatStatus WHERE chatId = UUID_TO_BIN(?); DELETE FROM chat WHERE chatId = UUID_TO_BIN(?); COMMIT;";

    sql.query(query, [chatId, chatId, chatId], (err, result, field) => {
      if (err) throw err;
    });
  }
}

module.exports = ChatService;
