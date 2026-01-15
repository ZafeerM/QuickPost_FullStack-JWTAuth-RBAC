const whitelist = require("./whitelist");

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //remove !origin in Production !!!
      callback(null, true);
    } else {
      callback(new Error("Blocked By CORS."));
    }
  },
};
module.exports = corsOptions;
