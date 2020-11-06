const route = require("express").Router();
const getUserListings = require("../../controllers/user/getUserListings");

route.get("/:userId/listings", getUserListings);

module.exports = route;
