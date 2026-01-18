// Libraries
const express = require("express");

// Create Express Router
const router = express.Router();

// Importing Controllers
const { loginHandler } = require("../controllers/authController");

// Routing Connections
router.route("/").post(loginHandler);

module.exports = router;
