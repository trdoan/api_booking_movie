const createHttpError = require("http-errors");
const { hashPassword } = require("../helpers/auth.helper");
const { findAllWithPagination } = require("../helpers/pagination.helper");
// const schemaCreateUser = require("../middlewares/validations/user.schema");
const { User } = require("./../models");
const getInfoUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  if (user) {
    res.send({ statusCode: 200, user });
  } else {
    next(createHttpError.NotFound("Không tìm thấy tài nguyên"));
  }
};
const getInfoByMe = async (req, res) => {
  const { user } = req;
  res.send({ statusCode: 200, user });
};
const getUserList = async (req, res) => {
  const _page = req.query._page;
  const _item = req.query._item;
  const { pagination, data } = await findAllWithPagination(User, _page, _item);
  res.send({
    statusCode: 200,
    pagination,
    userList: data,
  });
};
const createNewUser = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.send({ statusCode: 200, user: newUser });
  } catch (error) {
    res.send(error.message);
  }
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
