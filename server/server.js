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
const authRoutes = require("./routes/authRoutes"); // Authenticate
const postsRoute = require("./routes/postsRoute"); // Posts Handling

app.use(cookieParser()); //allow cookie parsing funcs
app.use(express.json()); // Allowing JSON Usage

app.use(eventLogger); //Event Logger
app.use(cors(corsOptions)); // CORS Whitelist

app.use("/auth", authRoutes); // (Signup, login, logout)

app.use(authToken); // JWT TOKEN CHECK --- All forward routes are checked now

app.use("/posts", postsRoute); //Create Delete AdminDelete Posts

app.use(errorHandler); // Custom Error Handlers

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// START LISTEN
app.listen(serverPort, (err) => {
  if (err) return console.error(err);
  else console.log(`Server Running at Port : ${serverPort}`);
});
