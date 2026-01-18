require("dotenv").config();
const { logger } = require("./loggerMiddleware");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const msg = err.message || "Something Went Wrong";

  // Log to Error File
  logger("errorlogs.txt", `${err.name}\t${req.headers.origin}\t${req.method}\t${req.url}\t ${err.message}`);

  // since res returning so no need of next()
  res.status(status).json({ message: msg, stack: process.env.NODE_ENV === "Production" ? null : err.stack });
};

module.exports = errorHandler;
