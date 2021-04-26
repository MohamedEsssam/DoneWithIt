const route = require("express").Router();
const getUserListings = require("../../controllers/user/getUserListings");
const jwtAuth = require("../../middleware/jwtAuth");

route.get("/:userId/listings", jwtAuth, getUserListings);

module.exports = route;
