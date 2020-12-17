const route = require("express").Router();
const getChats = require("../../controllers/chat/getChats");
// const deleteChat = require("../../controllers/chat/deleteChat");

route.get("/", getChats);
// route.delete("/", deleteChat);

module.exports = route;
