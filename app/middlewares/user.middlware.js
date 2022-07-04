const createError = require("http-errors");
const { User } = require("../models");

const checkUserExits = (prefix) => {
  return async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (prefix) {
      if (user) {
        req.user = user;
        next();
      } else {
        next(createError.NotFound("Người dùng không tồn tại"));
      }
    } else {
      if (user) {
        next(createError.BadRequest("Người dùng đã tồn tại"));
      } else {
        next();
      }
    }
  };
};
module.exports = {
  checkUserExits,
};
