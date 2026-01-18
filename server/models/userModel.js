// Configs
const pool = require("../config/dbConnection"); // Db connection
const roles = require("../config/rolesValue"); // Roles value

// Utils
const { bcryptHasher, bcryptCheckPass } = require("../utils/bcryptHasher");

// Add New User to DB (encrypt pass)
// @Route POST /SignUp
const addNewUser = async (user, pass) => {
  const sql = `INSERT INTO Users (User_Name, User_Pass, User_Role)
               VALUES ($1, $2, $3)
               RETURNING User_ID`;
  encryptedPass = await bcryptHasher(pass);

  const res = await pool.query(sql, [user, encryptedPass, roles.user]);
  return res.rows[0];
};

// Check User in DB
// @Route POST /Login
const authUser = async (user, pass) => {
  const sql = `SELECT user_pass, user_id, user_role
               FROM Users
               WHERE user_name = $1`;

  const res = await pool.query(sql, [user]);

  var check;
  try {
    check = await bcryptCheckPass(pass, res.rows[0].user_pass);
  } catch (error) {
    return -1;
  }

  if (check) return res.rows[0];
  else return -1;
};

// Add Refresh Token in Database
// @Route POST /Login
const addRefreshToken = async (id, token) => {
  const sql = `INSERT INTO Refreshtokens(user_id, refresh_token)
               VALUES($1, $2)`;

  try {
    await pool.query(sql, [id, await bcryptHasher(token)]);
    return 1;
  } catch (error) {
    return -1;
  }
};

// Remove Refresh Token and Logout
// @Route POST /Logout
const removeRefreshToken = async (id) => {
  const sql = `DELETE FROM refreshTokens
               WHERE user_id = $1`;

  return await pool.query(sql, [id]);
};

module.exports = { addNewUser, authUser, addRefreshToken, removeRefreshToken };
