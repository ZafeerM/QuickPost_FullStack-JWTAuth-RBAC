const authorizeRole = (...acceptedroles) => {
  return (req, res, next) => {
    console.log("Accepted Roles: ", acceptedroles, "User Role:", req.user.role);
    if (!acceptedroles[0].includes(req.user.role)) {
      const err = new Error("Forbidden: You Are Not Authorized For This Request.");
      err.status = 403;
      next(err);
    }
    next();
  };
};

module.exports = authorizeRole;
