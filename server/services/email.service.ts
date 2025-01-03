const nodeMailer = require("nodemailer");
const mailGen = require("mailgen");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = async (userEmail: string, user: any) => {
  try {
    const emailToken = user.generateEmailVerificationToken();
    const mailGenerator = new mailGen({
      theme: "default",
      product: {
        name: "Flickbase",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });
    const email = {
      body: {
        name: userEmail,
        intro: "Welcome to Flickbase! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Flickbase, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${process.env.SITE_DOMAIN}/verify-email/?t=${emailToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(email);
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: "Welcome to Flickbase",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerEmail };
