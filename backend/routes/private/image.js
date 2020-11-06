const express = require("express");
const router = express.Router();
const imageUpload = require("../../middleware/imageUpload");
const imgRename = require("../../middleware/imgRename");

router.post("/", imageUpload, imgRename, async (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).send("No images uploaded");

  res.status(200).json(req.files);
});

module.exports = router;
