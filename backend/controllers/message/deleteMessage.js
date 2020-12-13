const io = require("../../startup/socket.io");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const messageId = req.body.messageId;
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  const message = await MessageServicesInstance.deleteMessage(
    messageId,
    senderId,
    receiverId
  );
  if (!message) return res.status(500).send("something error can't delete!");

  io.getIO().emit("message", { action: "delete", message: message });

  return res.status(200).send(message);
};
