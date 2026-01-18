// Models Imports
const { addNewUser } = require("../models/userModel"); //For SignUp
const { removeRefreshToken } = require("../models/userModel");

// @desc    POST New User
// @route   /SignUp
const signupHandler = async (req, res, next) => {
  // handle empty or wrong res
  if (!req.body.userName || !req.body.userPass) {
    const error = new Error("Invalid Or Empty User or Pass in req body");
    error.status = 400;
    return next(error);
    // return res.status(400).json({ message: "Invalid Or Empty User or Pass in req body" });
  }
  // destructure
  const { userName, userPass } = req.body;

  try {
    const modelResp = await addNewUser(userName, userPass);
    res.status(201).json({
      message: `User ${userName} Created Successfully - User ID: ${modelResp.user_id}`,
    });
  } catch (err) {
    let error;
    if (err.code === "23505") {
      error = new Error("Username Already In Use");
      error.status = 409;
    } else {
      error = new Error("Server Error - Cannot Create User");
      error.status = 500;
    }
    return next(error);
  }
};

// @desc    POST Verify UserPass, RefreshToken (Cookie, DB) and AccessToken Return
// @route   /Login
const loginHandler = async (req, res, next) => {
  const { loginUser, loginPass } = req.body;

  try {
    // catch req body errors
    if (!req.body.loginUser || !req.body.loginPass) {
      const err = new Error("Invalid Or Empty User or Pass in req body");
      err.status = 400;
      throw err;
    }

    // Login Checking Main
    // Verify Login Details - and Give JWT tokens (Auth and Refresh)
    const response = await authUser(loginUser, loginPass);

    // If unauthorized;
    if (response === -1) {
      const err = new Error("Username or Password Incorrect");
      err.status = 401;
      throw err;
    }

    // JWT Token - Refresh
    const refreshToken = getToken("refresh", response.user_id, response.user_role);

    // Check if Refresh already exists
    if ((await addRefreshToken(response.user_id, refreshToken)) === -1) {
      throw new Error("Refresh Token Already Exists! (Already Logged In)");
    }

    // Put Refresh in HTTP-Cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    // JWT Token - Access
    const accessToken = getToken("access", response.user_id, response.user_role);
    res.status(200).json({ Token: accessToken });
  } catch (error) {
    next(error);
  }
};

// Remove Refresh Token and Logout
// @Route POST /Logout
const logoutController = async (req, res, next) => {
  try {
    await removeRefreshToken(req.userID);
    res.sendStatus(200);
  } catch (error) {
    return next(new Error(error.message));
  }
};

module.exports = { signupHandler, loginHandler, logoutController };
