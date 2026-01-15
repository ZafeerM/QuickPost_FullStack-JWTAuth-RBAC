// Import Pool Config
const pool = require("../config/dbConnection");
// Utils
const bcryptHasher = require("../utils/bcryptHasher");

// Add New User to DB (encrypt pass)
// @Route POST /SignUp
const addNewUser = async (user, pass) => {
  const sql = `INSERT INTO Users (User_Name, User_Pass, User_Role)
               VALUES ($1, $2, $3)
               RETURNING User_ID`;
  encryptedPass = await bcryptHasher(pass);
  const res = await pool.query(sql, [user, encryptedPass, 1093]);
  return res.rows[0];
};

module.exports = { addNewUser };
