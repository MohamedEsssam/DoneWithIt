const io = require("../../startup/socket.io");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const text = req.body.text;
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  const message = await MessageServicesInstance.sendMessage(
    text,
    senderId,
    receiverId
  );

  if (!message) return res.status(500).send("something error happen !");

  io.getIO().emit("message", { action: "create", message: message });

  res.status(200).send(message);
};
