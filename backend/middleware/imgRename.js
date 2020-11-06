const path = require("path").resolve(__dirname, "../public");
const fs = require("fs");

module.exports = function (req, res, next) {
  const uid = req.query.uid;
  const name = req.query.name;

  req.files.map((img, index) => {
    fs.rename(
      path + "/" + img.filename,
      path + "/" + uid + "-" + name + "-img" + (index + 1),
      function (err) {
        if (err) console.log("ERROR: " + err);
      }
    );
    img.filename = uid + "-" + name + "-img" + (index + 1);
  });

  next();
};
