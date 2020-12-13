const io = require("../../startup/socket.io");
const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const listingId = req.params.listingId;
  const userId = req.body.userId;

  const listing = await ListingServicesInstance.deleteListing(
    listingId,
    userId
  );

  if (!listing) return res.status(500).send("something error can't delete!");

  io.getIO().emit("listing", { action: "delete", listing: listing });

  return res.status(200).send(listing);
};
