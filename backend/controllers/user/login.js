const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const token = await UserServicesInstance.login(email, password);

  if (!token) return res.status(404).send("Invalid email or password.");

  if (token === "not verified")
    return res.status(401).send("Email not verified.");

  return res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
};
