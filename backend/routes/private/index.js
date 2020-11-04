const router = require("express").Router();
const listing = require("./listing");

router.use("/listing", listing);
module.exports = router;
