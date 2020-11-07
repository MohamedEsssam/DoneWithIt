const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const token = await UserServicesInstance.register(name, email, password);

  if (!token) return res.status(404).send("User already exist.");

  return res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
};
