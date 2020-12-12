const config = require("config");

module.exports = () => {
  if (!config.get("authSecret"))
    throw new Error("FATAL ERROR: auth secret is not defined.");

  if (!config.get("mysqlPass"))
    throw new Error("FATAL ERROR: mysql Password is not defined.");

  if (!config.get("dbName"))
    throw new Error("FATAL ERROR: database is not defined.");

  if (!config.get("mailerUser"))
    throw new Error("FATAL ERROR: mailerUser is not defined.");

  if (!config.get("mailerPass"))
    throw new Error("FATAL ERROR: mailerPass is not defined.");
};
