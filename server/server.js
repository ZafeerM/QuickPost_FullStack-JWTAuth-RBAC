// --LIBRARIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// --VARIABLES
const serverPort = parseInt(process.env.SERVER_PORT) || 3030; // Port Number from .ENV
const app = express(); // Intialize Express

// --IMPORT & APPLY CORS Whitelist
const corsOptions = require("./config/corsSetup");
app.use(cors(corsOptions));

// --ROUTES
const Login = require("./routes/loginRoutes"); // Login Route
const Signup = require("./routes/signupRoutes"); // SignUp Route

app.use(express.json()); // Allowing JSON Usage

app.use("/Login", Login); // Login Route Connect
app.use("/SignUp", Signup); // Signup Route Connect

// START LISTEN
app.listen(serverPort, (err) => {
  if (err) return console.error(err);
  else console.log(`Server Running at Port : ${serverPort}`);
});
