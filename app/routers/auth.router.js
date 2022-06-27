const { Router } = require("express");
const { signIn, signUp, forgotPassword } = require("../controllers/auth.controller");
const { checkUserExits } = require("../middlewares/user.middlware");
const { validationSignUp } = require("../middlewares/validations/auth.validation");

const authRouter = Router();
authRouter.post("/sign-in", checkUserExits(true), signIn);
authRouter.post("/sign-up", checkUserExits(false), validationSignUp, signUp);
authRouter.post("/forgot-my-password", forgotPassword);
module.exports = authRouter;
