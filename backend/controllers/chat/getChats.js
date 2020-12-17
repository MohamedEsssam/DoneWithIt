const ChatsServices = require("../../services/ChatServices");
const ChatsServicesInstance = new ChatsServices();

module.exports = async (req, res) => {
  const userId = req.query.userId;

  const chats = await ChatsServicesInstance.getChats(userId);
  if (!chats) return res.status(500).send("something error happen !");

  res.status(200).send(chats);
};
