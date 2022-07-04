const { Router } = require("express");
const {
  getInfoMovie,
  createMovie,
  getMovieList,
  deleteMovie,
  updateMovie,
} = require("../controllers/movie.controller");
const { checkExist } = require("../middlewares/check-id.middleware");
const { Movie } = require("./../models");
const movieRouter = Router();
var cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { verifyToken, authorize } = require("../middlewares/auth.middlware");
const movie = require("../models/movie");
const storage = multer.memoryStorage();
const upload = multer({ storage });
movieRouter.get("/", getMovieList);
movieRouter.get("/:id", checkExist(Movie), getInfoMovie);
movieRouter.post("/", upload.single("poster"), createMovie);
movieRouter.delete(
  "/:id",
  checkExist(Movie),
  verifyToken,
  authorize(["ADMIN", "SPADMIN"]),
  deleteMovie
);
movieRouter.put(
  "/:id",
  upload.single("poster"),
  checkExist(Movie),
  updateMovie
);
module.exports = movieRouter;
