const cors = require("cors");

module.exports = (app) => {
  const options = {
    origin: "http://localhost:3000",
    exposedHeaders: ["x-auth-token"],
  };
  app.use(cors(options));
  app.options("*", cors(options));
};
