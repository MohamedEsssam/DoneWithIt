const router = require("express").Router();
const listing = require("./listing");
const user = require("./user");
const image = require("./image");

router.use("/listing", listing);
router.use("/user", user);
router.use("/image", image);

module.exports = router;
