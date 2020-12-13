const route = require("express").Router();
const getMessages = require("../../controllers/message/getMessages");
const createMessage = require("../../controllers/message/createMessage");
const deleteMessage = require("../../controllers/message/deleteMessage");

route.get("/", getMessages);
route.post("/", createMessage);
route.delete("/", deleteMessage);

module.exports = route;
