const config = require("config");

module.exports = () => {
  if (!config.get("authSecret"))
    throw new Error("FATAL ERROR: auth secret is not defined.");

  if (!config.get("mysqlPass"))
    throw new Error("FATAL ERROR: mysql Password is not defined.");
};
