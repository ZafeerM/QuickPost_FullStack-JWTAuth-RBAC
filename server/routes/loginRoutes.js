// Libraries
const express = require("express");

// Create Express Router
const router = express.Router();

// Importing Controllers
const {
  welcomeLogin,
  loginHandler,
} = require("../controllers/loginController");

// Routing Connections
router.route("/").get(welcomeLogin).post(loginHandler);

module.exports = router;
