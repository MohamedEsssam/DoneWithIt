const router = require("express").Router();
const listing = require("./listing");
const message = require("./message");
const image = require("./image");
const user = require("./user");

router.use("/listing", listing);
router.use("/message", message);
router.use("/image", image);
router.use("/user", user);

module.exports = router;
