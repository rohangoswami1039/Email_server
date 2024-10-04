// src/utils/bcryptUtils.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateSignUpToken = (email, name, password) => {
  const payload = { email, name, password };
  console.log("Payload:", payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  return token;
};

const verifySignUpToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const generateLoginToken = (email, password) => {
  const payload = { email, password };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
  return token.toString();
};

const verifyLoginToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateSignUpToken,
  verifySignUpToken,
  generateLoginToken,
  verifyLoginToken,
};
