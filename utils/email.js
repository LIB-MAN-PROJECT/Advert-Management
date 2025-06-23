const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Load your .env

// transporter setup (using Gmail or Mailtrap, see below)
const transporter = nodemailer.createTransport({
  service: "gmail", // or use 'smtp.mailtrap.io' if you're testing
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (toEmail, username) => {
  const mailOptions = {
    from: `"Advert App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Advert App ",
    html: `<h2>Hello ${username}!</h2>
           <p>Welcome to the Advert App for chefs and recipe books. We're glad to have you on board!</p>
           <p>Happy posting </p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(" Welcome email sent to", toEmail);
  } catch (err) {
    console.error(" Email send failed:", err.message);
  }
};

module.exports = { sendWelcomeEmail };