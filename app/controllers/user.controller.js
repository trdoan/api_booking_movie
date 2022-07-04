const createHttpError = require("http-errors");
const { hashPassword } = require("../helpers/auth.helper");
const { User } = require("./../models");
const getInfoUser = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const user = await User.findByPk(id);
  res.send(user);
};
const getInfoByMe = async (req, res) => {
  const { user } = req;
  res.send(user);
};
const getUserList = async (req, res) => {
  // check admin
  const userList = await User.findAll();
  res.send(userList);
};
const createNewUser = async (req, res) => {
  const hashedPassword = hashPassword(req.body.password);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.send(newUser);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  // check admin
  res.status(200).send({
    statusCode: 200,
    message: "Xoá người dùng thành công",
  });
};
const updateUserInfo = async (req, res, next) => {
  res.send("updateUserInfo");
};

module.exports = {
  getInfoUser,
  getInfoByMe,
  getUserList,
  createNewUser,
  deleteUser,
  updateUserInfo,
};
