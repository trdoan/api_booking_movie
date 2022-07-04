const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const randomPassword = () => {
  const randomstring = Math.random().toString(36).slice(-8);
  return randomstring;
};
module.exports = {
  hashPassword,
  comparePassword,
  randomPassword,
};
