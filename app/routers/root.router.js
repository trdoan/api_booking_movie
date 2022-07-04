const { Router } = require("express");
const authRouter = require("./auth.router");
const movieRouter = require("./movie.router");
const userRouter = require("./users.router");

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/movie", movieRouter);

module.exports = rootRouter;
