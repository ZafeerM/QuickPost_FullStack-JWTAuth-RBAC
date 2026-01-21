// Config
const roles = require("../config/rolesValue");

// Model Import
const { getPosts, addPost, getPost, deletePostDb } = require("../models/postModel");

// Get All Posts (To see All Posts)
// ROUTE @ GET /posts
const getAllPosts = async (req, res, next) => {
  try {
    const data = await getPosts();
    res.status(200).json(data);
  } catch (error) {
    next(new Error("Error Fetching Posts"));
  }
};

// Create Post using req.data as message
// ROUTE @ POST /posts/createPost
const createPost = async (req, res, next) => {
  try {
    if (!req.body.data) {
      const err = new Error("Request Data Missing For Post");
      err.status = 400;
      throw err;
    }
    // add to db

    const postid = await addPost(req.user.id, req.body.data);

    console.log(postid);

    res.status(201).json({ message: `Post Created Successfully, Post ID: ${postid}` });
  } catch (error) {
    next(error);
  }
};

// Delete a post (User Owner or Admin Any)
// ROUTE @ DELETE /posts/:id
const deletePost = async (req, res, next) => {
  try {
    // Moderator God Mode Access
    if (req.user.role === roles.moderator) {
      await deletePostDb(req.params.id);
      return res.status(200).json({ message: "Post Deleted - By Moderator." });
    }

    const { user_id } = await getPost(req.params.id);
    console.log(user_id);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPosts, createPost, deletePost };
