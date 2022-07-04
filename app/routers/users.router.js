const { Router } = require("express");
const {
  getInfoUser,
  getUserList,
  createNewUser,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middlware");
const { checkUserExits } = require("../middlewares/user.middlware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
var cloudinary = require("cloudinary").v2;
const userRouter = Router();
const createHttpError = require("http-errors");
const { uploadImage } = require("../middlewares/upload/upload.middlware");

userRouter.get("/", verifyToken, authorize(["ADMIN", "SPADMIN"]), getUserList);
userRouter.get(
  "/:id",
  verifyToken,
  authorize(["ADMIN", "SPADMIN"]),
  getInfoUser
);
// userRouter.post("/test", upload.single("avatar"), async (req, res, next) => {
//   const { file, body } = req;
//   const { url } = await uploadImage(req.file, "poster");
//   res.send(url);
// });
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
  deleteUser
);

module.exports = userRouter;
