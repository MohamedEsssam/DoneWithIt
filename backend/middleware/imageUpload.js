const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public",

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("jpg") &&
    !file.mimetype.includes("png")
  )
    return cb("File is not an image", false);
  return cb(null, true);
};

const limits = {
  fileSize: 4 * 1024 * 1024,
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).array("image", 4);
