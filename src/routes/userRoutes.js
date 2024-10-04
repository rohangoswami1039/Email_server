// src/routes/userRoutes.js
const express = require("express");
const {
  sendSignUpLink,
  completeSignUp,
} = require("../Controllers/SendUserLink");

const {
  sendUserEmail_with_Attachment,
} = require("../Controllers/SendUserEmail");

const router = express.Router();

router.post("/sendemail", sendUserEmail_with_Attachment);

//router.post("/signup", sendSignUpLink);
//router.get("/completeSignUp", completeSignUp);

module.exports = router;
