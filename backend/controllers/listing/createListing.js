const io = require("../../startup/socket.io");
const ListingServices = require("../../services/ListingServices");
const ListingServicesInstance = new ListingServices();

module.exports = async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const userId = req.body.userId;

  const listing = await ListingServicesInstance.createListing(
    title,
    price,
    category,
    description,
    userId
  );
  if (!listing) return res.status(500).send("something error happen !");

  io.getIO().emit("listing", { action: "create", listing: listing });

  res.status(200).send(listing);
};
