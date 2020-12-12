const EmailServices = require("../../services/EmailServices");
const EmailServicesInstance = new EmailServices();

module.exports = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);

  await EmailServicesInstance.verifyEmail(userId);
  res.end("<h1>Email is been Successfully verified");

  return res.status(200).send("Email verified");
};
