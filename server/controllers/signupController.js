// Models Imports
const { addNewUser } = require("../models/userModel");

// temp pool ---------
const pool = require("../config/dbConnection");

// @desc    POST New User
// @route   /SignUp
const signupHandler = async (req, res) => {
  // handle empty or wrong res
  if (!req.body.userName || !req.body.userPass) {
    return res.status(400).json({ message: "Invalid Or Empty User or Pass in req body" });
  }
  // destructure
  const { userName, userPass } = req.body;

  try {
    const modelResp = await addNewUser(userName, userPass);
    res.status(201).json({
      message: `User ${userName} Created Successfully - User ID: ${modelResp.user_id}`,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: `Username Already In Use` });
    }
    return res.status(500).json({ message: `Server Error - Cannot Create User` });
  }
};

module.exports = { signupHandler };
