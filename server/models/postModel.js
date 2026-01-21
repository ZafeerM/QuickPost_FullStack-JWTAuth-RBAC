// DB Connection
const pool = require("../config/dbConnection");

// Utils
const formatDate = require("../utils/dateFormatter");

// Get All Posts
// ROUTE @ GET /posts
const getPosts = async () => {
  const sql = `SELECT u.user_name, p.post_id, p.post_data, p.post_time
               FROM userposts p
               JOIN Users u ON u.user_id=p.user_id`;

  const val = await pool.query(sql);
  return val.rows;
};

// Create Post add to DB
// ROUTE @ POST /posts/createPost
const addPost = async (id, data) => {
  const sql = `INSERT INTO userposts (User_ID, Post_Data, Post_Time)
               VALUES($1, $2, $3)
               RETURNING Post_ID`;

  const val = await pool.query(sql, [id, data, await formatDate()]);
  return val.rows[0].post_id;
};

// Get Specific Post
// ROUTE @ (used in delete)
const getPost = async (id) => {
  const sql = `SELECT u.user_id
               FROM userposts p
               JOIN Users u ON u.user_id=p.user_id
               WHERE p.post_id = $1`;

  const val = await pool.query(sql, [id]);
  return val.rows[0];
};

// Delete a post
// ROUTE @ DELETE /posts/:id
const deletePostDb = async (id) => {
  const sql = `DELETE FROM userposts
               WHERE post_id = $1`;

  const val = await pool.query(sql, [id]);
  return val;
};

module.exports = { getPosts, addPost, getPost, deletePostDb };
