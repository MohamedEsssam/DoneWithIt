const express = require("express");
const app = express();
const server = app.listen(8000, () => {
  console.log("app listening on port 8000!");
});

app.use(
  express.static("public", {
    index: false,
    extensions: ["png", "jpg", "jpeg", "mp4", "avi", "3gp"],
  })
);

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/connectDB");
// require("./models/createTables");
require("./startup/routes")(app);
require("./startup/socket.io").init(server);
