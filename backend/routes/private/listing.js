const route = require("express").Router();
const getListings = require("../../controllers/listing/getListings");
const getListing = require("../../controllers/listing/getListing");
const createListing = require("../../controllers/listing/createListing");
const updateListing = require("../../controllers/listing/updateListing");
const deleteListing = require("../../controllers/listing/deleteListing");
const jwtAuth = require("../../middleware/jwtAuth");

route.get("/", jwtAuth, getListings);
route.get("/:listingId", jwtAuth, getListing);
route.post("/", jwtAuth, createListing);
route.put("/:listingId", jwtAuth, updateListing);
route.delete("/:listingId", jwtAuth, deleteListing);

module.exports = route;
