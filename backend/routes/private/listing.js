const route = require("express").Router();
const getListings = require("../../controllers/listing/getListings");
const getListing = require("../../controllers/listing/getListing");
const createListing = require("../../controllers/listing/createListing");

route.get("/", getListings);
route.get("/:listingId", getListing);
route.post("/", createListing);

module.exports = route;
