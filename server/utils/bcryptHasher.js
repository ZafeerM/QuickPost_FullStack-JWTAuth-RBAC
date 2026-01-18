// Libraries
const bcrypt = require("bcrypt");
const passwordSalt = parseInt(process.env.PASS_SALT); // Salt value for Bcrypt Encryption (from .env)

// Password Hasher Function
const bcryptHasher = async (Password) => {
  const encryptedPass = await bcrypt.hashSync(Password, passwordSalt);
  return encryptedPass;
};

const bcryptCheckPass = async (passNew, passDB) => {
  return bcrypt.compareSync(passNew, passDB);
};

module.exports = { bcryptHasher, bcryptCheckPass };
