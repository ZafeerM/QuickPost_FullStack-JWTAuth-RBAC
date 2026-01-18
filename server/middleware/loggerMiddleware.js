// --UTILS
const formatDate = require("../utils/dateFormatter"); //to format date in dd/MM/yyyy\tHH:mm:ss

// File Handling Modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logger = async (filename, message) => {
  const logItem = `${message} \t\t ${formatDate()}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", filename), logItem);
  } catch (error) {
    console.error(error);
  }
};

const eventLogger = (req, res, next) => {
  logger("eventsLog.txt", `${req.headers.origin}\t${req.method}\t${req.url}`);
  next();
};

module.exports = { logger, eventLogger };
