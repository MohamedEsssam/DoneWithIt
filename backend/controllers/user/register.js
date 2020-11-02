const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserServicesInstance.register(name, email, password);

  if (!user) return res.status(404).send("User already exist.");

  return res.status(200).send(user);
};
