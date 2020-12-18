const io = require("../../startup/socket.io");
const ChatServices = require("../../services/ChatServices");
const ChatServicesInstance = new ChatServices();

module.exports = async (req, res) => {
  const chatId = req.body.chatId;
  const userId = req.body.userId;

  const chat = await ChatServicesInstance.deleteChat(chatId, userId);
  if (!chat) return res.status(500).send("something error can't delete!");

  io.getIO().emit("chat", { action: "delete", chat: chat });

  return res.status(200).send(chat);
};
