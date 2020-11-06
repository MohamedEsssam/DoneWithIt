const express = require("express");
const router = express.Router();
const imageUpload = require("../../middleware/imageUpload");

router.post("/", imageUpload, async (req, res) => {
  if (!req.body.image || req.body.uuid === 0)
    return res.status(400).send("No images uploaded");

  res.status(200).json("image posted");
});

module.exports = router;
