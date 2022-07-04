const createHttpError = require("http-errors");
// const { User, Movie } = require("./../models");

const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const isExist = await Model.findByPk(id);
    if (isExist) {
      next();
    } else {
      next(createHttpError.NotFound("Không tìm thầy tài nguyên"));
    }
  };
};
module.exports = {
  checkExist,
};
