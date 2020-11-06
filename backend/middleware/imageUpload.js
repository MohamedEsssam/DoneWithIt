const path = require("path").resolve(__dirname, "../public");
const fs = require("fs");

module.exports = function (req, res, next) {
  const image = req.body.image;
  const uuid = req.body.uuid;

  fs.writeFileSync(path + `/listingImage-${uuid}`, image, "base64", (err) => {
    if (err) throw err;
  });

  next();
};
