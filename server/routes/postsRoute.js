// Modules
const express = require("express");
// Config
const roles = require("../config/rolesValue");
// Middleware
const authorizeRole = require("../middleware/rolebaseMiddleware"); //for role based allowance
// Controllers
const { getAllPosts, createPost, deletePost } = require("../controllers/postsController");

// Create Express Router
const router = express.Router();
// All Posts Route
router.route("/").get(authorizeRole([roles.user, roles.viewer, roles.moderator]), getAllPosts);
// Create Post
router.post("/createPost", authorizeRole([roles.user, roles.moderator]), createPost);
// Delete Post
router.delete("/:id", authorizeRole([roles.user, roles.moderator]), deletePost);
module.exports = router;
