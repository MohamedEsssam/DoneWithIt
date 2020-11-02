const route = require("express").Router();
const login = require("../../controllers/user/login");
const register = require("../../controllers/user/register");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
