const createError = require("http-errors");
const { User } = require("../models");
const { createUserSchema } = require("./validations/user.schema");

const checkUserExits = (prefix) => {
  return async (req, res, next) => {
    try {
      const valid = await createUserSchema.validateAsync(req.body);
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
    } catch (error) {
      console.log(error);
      next(createError.BadRequest(error.details[0]?.message || error.message));
    }
  };
};
module.exports = {
  checkUserExits,
};
