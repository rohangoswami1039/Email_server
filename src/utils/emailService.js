const nodemailer = require("nodemailer");
const path = require("path"); // Import the path module

//import "../../Resume/Resume.pdf";

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

const sendEmail = (to, subject, html) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER, // Sender address
    to, // List of recipients
    subject,
    html, // HTML body content
    attachments: [
      {
        filename: "Resume.pdf",
        path: path.join(__dirname, "../../Resume/Resume.pdf"),
      },
    ],
  });
};

module.exports = { sendEmail };
