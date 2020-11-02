const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserServicesInstance.login(email, password);

  if (!user) return res.status(404).send("Invalid email or password.");

  return res.status(200).send(user);
};
