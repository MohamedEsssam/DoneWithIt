const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const chatId = req.query.chatId;

  const messages = await MessageServicesInstance.getMessages(chatId);
  if (!messages) return res.status(500).send("something error happen !");

  res.status(200).send(messages);
};
