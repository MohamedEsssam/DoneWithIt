const route = require("express").Router();
const getListings = require("../../controllers/listing/getListings");
const getListing = require("../../controllers/listing/getListing");
const createListing = require("../../controllers/listing/createListing");
const updateListing = require("../../controllers/listing/updateListing");
const deleteListing = require("../../controllers/listing/deleteListing");

route.get("/", getListings);
route.get("/:listingId", getListing);
route.post("/", createListing);
route.put("/:listingId", updateListing);
route.delete("/:listingId", deleteListing);

module.exports = route;
