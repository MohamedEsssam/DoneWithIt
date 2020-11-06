const router = require("express").Router();
const listing = require("./listing");
const image = require("./image");

router.use("/listing", listing);
// router.use("/image", image);

module.exports = router;
