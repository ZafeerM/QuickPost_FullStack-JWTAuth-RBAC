// Libraries
const express = require("express");

// Create Express Router
const router = express.Router();

// Controllers
const { getAllPosts } = require("../controllers/postsController");

// All Posts Route
router.route("/").get(getAllPosts);

module.exports = router;
