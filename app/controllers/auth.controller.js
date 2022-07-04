const {
  hashPassword,
  comparePassword,
  randomPassword,
} = require("../helpers/auth.helper");
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
    const token = jwt.sign(
      { id: user.id, fullName: user.fullName, sex: user.sex, role: user.role },
      privateKey
    );
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
const forgotPassword = async (req, res, next) => {
  try {
    const { user } = req;

    const newPassword = randomPassword();
    console.log(newPassword);
    req.password = newPassword;
    await User.update(
      {
        password: hashPassword(newPassword),
      },
      {
        where: {
          id: 1,
        },
      }
    );
    res.send("success");
    next();
  } catch (error) {
    next(createError[500]);
  }
};
module.exports = {
  signIn,
  signUp,
  forgotPassword,
};
