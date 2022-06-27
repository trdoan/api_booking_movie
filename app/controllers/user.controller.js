const { User } = require("./../models");
const getInfoUser = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

const getUserList = async (req, res) => {
  // check admin
  const userList = await User.findAll();
  res.send(userList);
};
const createNewUser = (req, res) => {
  // check admin
  res.send("createNewUser");
};
const deleteUser = (req, res) => {
  // check admin
  res.send("deleteUser");
};
const updateUserInfo = (req, res) => {
  // check admin
  res.send("updateUserInfo");
};

module.exports = {
  getInfoUser,
  getUserList,
  createNewUser,
  deleteUser,
  updateUserInfo,
};
