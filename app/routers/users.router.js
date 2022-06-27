const { Router } = require("express");
const {
  getInfoUser,
  getUserList,
  createNewUser,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUserList);
userRouter.get("/:id", getInfoUser);
userRouter.post("/", createNewUser);
userRouter.put("/:id", updateUserInfo);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
