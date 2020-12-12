const config = require("config");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sql = require("../startup/connectDB");

class EmailServices {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.get("mailerUser"),
        pass: config.get("mailerPass"),
      },
    });
  }

  async sendVerificationEmail({ userId, name, email }) {
    const link = "http://localhost:9000/api/user/verify?id=" + userId;

    this.transporter.sendMail({
      from: "mohamed.essam.diab97@gmail.com",
      to: email,
      subject: "Verification Request",
      html: `Hello ${name},<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
    });
  }
  async verifyEmail(useId) {
    const query = "UPDATE user SET status=? WHERE userId=UUID_TO_BIN(?)";
    sql.query(query, ["verified", useId], (err, result, field) => {
      if (err) throw err;
    });
  }
}
module.exports = EmailServices;
