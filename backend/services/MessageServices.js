const sql = require("../startup/connectDB");
const { generateId, validId } = require("./utils");

class MessageServices {
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
    const messageId = await generateId();

    if (!validId(senderId) || !validId(receiverId) || !validId(messageId))
      return;

    const query =
      "INSERT INTO message (messageId, text, sentDate, senderId, receiverId) VALUES (UUID_TO_BIN(?), ?, NOW(), UUID_TO_BIN(?), UUID_TO_BIN(?));";
    sql.query(query, [messageId, text, senderId, receiverId]);

    return await this.getMessageById(messageId);
  }

  //TODO think for logic !!
  async deleteMessage(messageId, senderId, receiverId) {}

  /*******************************************************************
   *                     Helper Methods                              *
   ******************************************************************/
  async getMessageById(messageId) {
    const query =
      "SELECT BIN_TO_UUID(messageId) AS messageId, text, sentDate, BIN_TO_UUID(senderId) AS senderId, BIN_TO_UUID(receiverId) AS receiverId  FROM message WHERE messageId = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      sql.query(query, [messageId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }
}
module.exports = MessageServices;
