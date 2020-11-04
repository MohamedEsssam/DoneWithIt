const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const listingId = req.params.listingId;

  const listings = await ListingServicesInstance.getListing(listingId);
  if (!listings) return res.status(500).send("something error happen !");

  res.status(200).send(listings);
};
