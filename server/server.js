// --MODULES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// --VARIABLES
const serverPort = parseInt(process.env.SERVER_PORT) || 3030; // Port Number from .ENV
const app = express(); // Intialize Express

// --MIDDLEWARES
const errorHandler = require("./middleware/errorMiddleware");
const { eventLogger } = require("./middleware/loggerMiddleware");
const { authToken } = require("./middleware/authMiddleware");

// --CONFIG (CORS)
const corsOptions = require("./config/corsSetup");

// --ROUTES
const Login = require("./routes/loginRoutes"); // Login Route
const Signup = require("./routes/signupRoutes"); // SignUp Route
const Logout = require("./routes/logoutRoutes"); // Logout Route

app.use(cookieParser()); //allow cookie parsing funcs

app.use(eventLogger); //Event Logger

app.use(express.json()); // Allowing JSON Usage

app.use(cors(corsOptions)); // CORS Whitelist

app.use("/Login", Login); // Login Route Connect
app.use("/SignUp", Signup); // Signup Route Connect

app.use(authToken); //JWT TOKEN CHECK --- All forward routes are checked now

app.use("/Logout", Logout);

app.use(errorHandler); //Custom Error Handler

// START LISTEN
app.listen(serverPort, (err) => {
  if (err) return console.error(err);
  else console.log(`Server Running at Port : ${serverPort}`);
});
