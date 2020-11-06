const path = require("path").resolve(__dirname, "../public");
const fs = require("fs");

module.exports = function (req, res, next) {
  const uuid = req.query.uuid;

  req.files.map((img) => {
    fs.rename(
      path + "/" + img.filename,
      path + "/" + "listingImage-" + uuid,
      function (err) {
        if (err) console.log("ERROR: " + err);
      }
    );
    img.filename = "listingImage-" + uuid;
  });

  next();
};
