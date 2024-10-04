// src/controllers/userController.js
const {
  createUser,
  findUserByUsername,
  findUserByEmail,
} = require("../Services/userService");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    console.log("Existing User >>> ", existingUser);

    if (existingUser) {
      return res.status(400).json({ error: "User Email already exists" });
    }

    const newUser = await createUser(email, name, password);
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", Message: error });
  }
};

module.exports = { signup };
