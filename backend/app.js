const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/connectDB");
// require("./models/createTables");
require("./startup/routes")(app);

app.use(
  express.static("public", {
    index: false,
    extensions: ["png", "jpg", "jpeg", "mp4", "avi", "3gp"],
  })
);

app.listen(9000, () => {
  console.log("app listening on port 9000!");
});
