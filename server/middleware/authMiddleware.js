// --Utils
const { verifyToken } = require("../utils/jwtTokens");

// Checks Token in Header Authorization: `Bearer ${AccessToken}`
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Authorization token missing or invalid");
    err.status = 401;
    return next(err);
  }
  const token = authHeader.split(" ")[1];

  try {
    const { userID, userRole } = verifyToken("access", token);

    // req.userID = userID;
    // req.userRole = userRole;

    req.user = {
      id: userID,
      role: userRole,
    };

    console.log("Auth Middleware: ", req.user.id, req.user.role);

    next();
  } catch (error) {
    const err = new Error(error.message);
    err.status = 401;
    return next(err);
  }
};

module.exports = { authToken };
