const createHttpError = require("http-errors");
const { uploadImage } = require("../middlewares/upload/upload.middlware");
const { Movie } = require("./../models");
const queryString = require("query-string");
const { findAllWithPagination } = require("../helpers/pagination.helper");

const getInfoMovie = async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  res.send(movie);
};
const getMovieList = async (req, res) => {
  const _page = req.query._page;
  const _item = req.query._item;
  const { pagination, data } = await findAllWithPagination(Movie, _page, _item);
  res.send({
    pagination,
    movieList: data,
  });
};
const createMovie = async (req, res) => {
  const { title, description, director, actor, rate, trailer, time, startTime } = req.body;
  const { file } = req;
  const cloud = await uploadImage(file, "poster");
  const movie = await Movie.create({ ...req.body, poster: cloud.url });
  res.send(movie);
};
const updateMovie = async (req, res, next) => {
  const { file } = req;
  const { id } = req.params;
  try {
    if (req.file) {
      const { url } = await uploadImage(req.file, "poster");
      await Movie.update(
        { ...req.body, poster: url },
        {
          where: { id },
        }
      );
    } else {
      await Movie.update(req.body, {
        where: { id },
      });
    }
    res.status(200).send({ statusCode: 200, message: "Cập nhật phim thành công" });
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError(error));
  }
};
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await Movie.destroy({ where: { id } });
  res.status(200).send({
    statusCode: 200,
    message: "Xoá phim dùng thành công",
  });
};
module.exports = {
  getInfoMovie,
  getMovieList,
  createMovie,
  updateMovie,
  deleteMovie,
};
