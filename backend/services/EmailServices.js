const config = require("config");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sql = require("../startup/connectDB");

class EmailServices {
  constructor() {
    this.transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: config.get("mailerApiKey"),
        },
        tracking_settings: {
          click_tracking: {
            enable: true,
            enable_text: true,
          },
        },
      })
    );
  }

  async sendVerificationEmail({ userId, name, email }) {
    console.log(userId, email, name);
    const link = "http://192.168.1.13:9000/verify?id=" + userId;

    this.transporter.sendMail({
      from: "mohamed.essam.diab97@gmail.com",
      to: email,
      subject: "Verification Request",
      html: `Hello ${name},<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
    });
    console.log("sent");
  }
  async verifyEmail(useId) {
    const query = "UPDATE user SET status=verified WHERE userId=?";
    sql.query(query, [useId], (err, result, field) => {
      if (err) throw err;
    });
  }
}
module.exports = EmailServices;
