const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("./../models");
const createError = require("http-errors");
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  const isValid = comparePassword(password, user.password);
  if (isValid) {
    const privateKey = process.env.PRIVATE_KEY;
    const token = jwt.sign({ id: user.id, fullName: user.fullName, sex: user.sex }, privateKey);
    res.send(token);
  } else {
    next(createError.Unauthorized("Tai khoan mat khau khong dung"));
  }
};
const signUp = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.send(newUser);
};
const forgotPassword = (req, res) => {
  res.send("forgotPassword");
};
module.exports = {
  signIn,
  signUp,
  forgotPassword,
};
