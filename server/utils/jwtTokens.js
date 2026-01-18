require("dotenv").config();
const jwt = require("jsonwebtoken");

// get Token, (refresh for refreshtoken and access for accesstoken)
const getToken = (tokenType, ID, role) => {
  var token =
    tokenType === "access"
      ? jwt.sign({ userID: ID, userRole: role }, process.env.ACCESS_SECRET, { expiresIn: "1h" })
      : jwt.sign({ userID: ID, userRole: role }, process.env.REFRESH_SECRET, { expiresIn: "1h" });

  return token;
};

const verifyToken = (tokenType, token) => {
  const secret = tokenType === "access" ? process.env.ACCESS_SECRET : process.env.REFRESH_SECRET;
  return jwt.verify(token, secret);
};

module.exports = { getToken, verifyToken };
