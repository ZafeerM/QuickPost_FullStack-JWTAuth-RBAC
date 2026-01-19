// Libraries
const express = require("express");

// Create Express Router
const router = express.Router();

// Middleware
const { authToken } = require("../middleware/authMiddleware");

// Importing Controllers
const { signupHandler, loginHandler, refreshAccessToken, logoutController } = require("../controllers/authController");

// Routing Connections
// router.route("/Login").post(loginHandler);
router.post("/Signup", signupHandler);
router.post("/Login", loginHandler);
router.post("/Refreshtoken", refreshAccessToken);
router.post("/Logout", authToken, logoutController);

module.exports = router;
