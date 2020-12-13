const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  const messages = await MessageServicesInstance.getMessages(
    senderId,
    receiverId
  );
  if (!messages) return res.status(500).send("something error happen !");

  res.status(200).send(messages);
};
