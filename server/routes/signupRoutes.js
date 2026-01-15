// Libraries
const express = require("express");

// Create Express Router
const router = express.Router();

// SignUP Controller import
const { signupHandler } = require("../controllers/signupController");

// Routing Connections
router.route("/").post(signupHandler);

module.exports = router;
