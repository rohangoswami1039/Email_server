const auth = require("../utils/Firebase/firebase_config");
const { sendEmail } = require("../utils/emailService");
const {
  generateSignUpToken,
  verifySignUpToken,
} = require("../utils/bcryptUtils");

const { findUserByEmail, createUser } = require("../Services/userService");

const sendSignUpLink = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = generateSignUpToken(email, name, password);

  try {
    // Generate email sign-in link
    const link = `${process.env.BACKEND_HOSTED_URL}/api/users/completeSignUp?token=${token}`;
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #333;">Welcome to Radius, ${name}</h1>
          <p style="color: #555;">We're excited to have you on board. Click the button below to complete your sign-up process.</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${link}" style="background-color: #28a745; color: white; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px;">Confirm Email</a>
        </div>
        <div style="text-align: center; color: #555; padding-top: 10px;">
          <p>If you didn’t sign up for this account, you can safely ignore this email.</p>
        </div>
        <div style="text-align: center; color: #999; font-size: 12px; padding-top: 20px;">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;
    const info = await sendEmail(email, "Complete Your Sign Up", emailContent);
    return res.status(200).json({ message: "Signup email sent", info, link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send signup email" });
  }
};

const completeSignUp = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = verifySignUpToken(token);
    if (!decoded || !decoded.email) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(400).json({
        error: "Token has expired. Please request a new sign-up link.",
      });
    }

    const { email, name, password } = decoded;
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        console.log("User already exists, prompting sign-in", existingUser);
        if (existingUser?.token) {
          return res.status(400).json({
            message: "User already exists",
            token: existingUser?.token,
          });
        } else {
          return res.status(400).json({ error: "Token does not exist" });
        }
      } else {
        const newUser = await createUser(email, name, password);
        return res
          .status(201)
          .json({ message: "User created successfully", newUser });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Error processing user sign-up",
        message: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify token" });
  }
};
module.exports = { sendSignUpLink, completeSignUp };
