const route = require("express").Router();
const getChats = require("../../controllers/chat/getChats");
const deleteChat = require("../../controllers/chat/deleteChat");
const jwtAuth = require("../../middleware/jwtAuth");

route.get("/", jwtAuth, getChats);
route.delete("/", jwtAuth, deleteChat);

module.exports = route;
