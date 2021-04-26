const route = require("express").Router();
const getMessages = require("../../controllers/message/getMessages");
const createMessage = require("../../controllers/message/createMessage");
const deleteMessage = require("../../controllers/message/deleteMessage");
const jwtAuth = require("../../middleware/jwtAuth");

route.get("/", jwtAuth, getMessages);
route.post("/", jwtAuth, createMessage);
route.delete("/", jwtAuth, deleteMessage);

module.exports = route;
