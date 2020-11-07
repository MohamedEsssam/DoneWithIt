const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const config = require("config");

class AuthServices {
  generateToken(user) {
    const payload = { ...pick(user, ["userId", "name", "email"]) };
    const token = jwt.sign(payload, config.get("authSecret"));

    return token;
  }
}
module.exports = AuthServices;
