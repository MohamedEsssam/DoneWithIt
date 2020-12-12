const EmailServices = require("../../services/EmailServices");
const EmailServicesInstance = new EmailServices();

module.exports = async (req, res) => {
  const userId = req.query.id;

  await EmailServicesInstance.verifyEmail(userId);
  res.end("<h1>Email is been Successfully verified");
};
