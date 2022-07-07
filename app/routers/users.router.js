const { Router } = require("express");
const {
  getInfoUser,
  getUserList,
  createNewUser,
  updateUserInfo,
  deleteUser,
  getInfoByMe,
} = require("../controllers/user.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middlware");
const { checkExist } = require("../middlewares/check-id.middleware");
const { checkUserExits } = require("../middlewares/user.middlware");
const { User } = require("./../models");
const userRouter = Router();

userRouter.get("/", verifyToken, authorize(["ADMIN", "SPADMIN"]), getUserList);
userRouter.get("/get-info-by-me", verifyToken, getInfoByMe);
userRouter.get("/:id", verifyToken, authorize(["ADMIN", "SPADMIN"]), getInfoUser);

userRouter.post(
  "/",
  verifyToken,
  authorize(["ADMIN", "SPADMIN"]),
  checkUserExits(false),
  createNewUser
);
userRouter.put("/:id", updateUserInfo);
userRouter.delete(
  "/:id",
  verifyToken,
  authorize(["ADMIN", "SPADMIN"]),
  checkExist(User),
  deleteUser
);

module.exports = userRouter;
