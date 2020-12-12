const config = require("config");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

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
    const link = "http://192.168.1.13:9000/verify?id=" + userId;

    this.transporter.sendMail({
      from: "doneWithIt-noreply@gmail.com",
      to: email,
      subject: "Verification Request",
      html: `Hello ${name},<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
    });
  }
}
module.exports = EmailServices;
