const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  try {
    const isValid = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = isValid;
    next();
  } catch (error) {
    next(
      createError.Unauthorized("Bạn cần đăng nhập để thực hiện chức năng này")
    );
  }
};
const authorize = (listRole) => {
  return async (req, res, next) => {
    const { user } = req;
    console.log(listRole.includes(user.role), user);
    if (listRole.includes(user.role)) {
      next();
    } else {
      next(createError.Forbidden("Không có quyền truy cập"));
    }
  };
};
module.exports = {
  verifyToken,
  authorize,
};
