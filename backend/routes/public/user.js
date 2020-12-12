const route = require("express").Router();
const login = require("../../controllers/user/login");
const register = require("../../controllers/user/register");
const verify = require("../../controllers/user/verify");

route.post("/login", login);
route.post("/register", register);
route.get("/verify", verify);

module.exports = route;
