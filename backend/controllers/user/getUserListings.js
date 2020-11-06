const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const userId = req.params.userId;
  const listings = await ListingServicesInstance.getUserListings(userId);
  if (!listings) return res.status(500).send("something error happen !");

  res.status(200).send(listings);
};
