const route = require("express").Router();
const getListings = require("../../controllers/listing/getListings");
const getListing = require("../../controllers/listing/getListing");

route.get("/", getListings);
route.get("/:listingId", getListing);

module.exports = route;
