const io = require("../../startup/socket.io");
const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const listingId = req.params.listingId;
  const userId = req.body.userId;

  const listing = await ListingServicesInstance.updateListing(
    listingId,
    userId,
    req.body
  );

  if (!listing) return res.status(500).send("something error can't update!");

  io.getIO().emit("listing", { action: "update", listing: listing });

  return res.status(200).send(listing);
};
