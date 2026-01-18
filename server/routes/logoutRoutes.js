//  --Modules
const express = require("express");

// --Controller
const { logoutController } = require("../controllers/authController");

const router = express.Router();

router.post("/", logoutController);

module.exports = router;
