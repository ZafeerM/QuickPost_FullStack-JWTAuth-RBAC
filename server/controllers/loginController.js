// Libraries
const bcrypt = require("bcrypt");
// Salt value for Bcrypt Encryption (from .env)
const passwordSalt = parseInt(process.env.PASS_SALT);

// @desc    GET Check User Login
// @route   /Login
const welcomeLogin = (req, res) => {
  console.log("Someone's connected!");
  res.status(200).json({ msg: "Welcome To The Server - By Login Router!" });
};

// @desc    POST Check User Login
// @route   /Login
const loginHandler = async (req, res) => {
  // catch req body errors
  if (!req.body || !req.body.loginUser || !req.body.loginPass)
    return res
      .status(400)
      .json({ error: "Invalid Or Empty User or Pass in req body" });

  const { loginUser, loginPass } = req.body;

  const encryptedPass = await bcrypt.hashSync(loginPass, passwordSalt);

  res.status(202).json({ User: `${loginUser}`, Password: `${encryptedPass}` });
};

module.exports = { welcomeLogin, loginHandler };
