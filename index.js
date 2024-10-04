require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process"); // Import exec to kill the Nodemon process
const userRoutes = require("./src/routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes of the Backend Server

//app.use("/api/users", userRoutes);
//app.get("/complete-signup", completeSignUp);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/close", (req, res) => {
  res.send("Closing server...");
  server.close(() => {
    console.log("Server closed");
    // Command to kill the Nodemon process (Windows)
    exec("taskkill /IM nodemon.exe /F", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping Nodemon: ${error}`);
        return;
      }
      console.log("Nodemon stopped.");
      process.exit(0); // Exit the process
    });
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
