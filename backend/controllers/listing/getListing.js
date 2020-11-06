const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const listingId = req.params.listingId;

  const listing = await ListingServicesInstance.getListing(listingId);
  if (!listing) return res.status(500).send("something error happen !");

  res.status(200).send(listing);
};
