const Joi = require("joi");

const schemaSignUp = Joi.object({
  fullName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .required()
    .error((errors) => {
      errors.map((err) => {
        switch (err.code) {
          case "any.required":
            err.message = "Mật khẩu không được để trống";
            break;
          case "string.min":
            err.message = `Mật khẩu không được ít hơn ${err.local.limit} kí tự!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  repeat_password: Joi.ref("password"),
  sex: Joi.string().valid("MALE", "FEMALE", "OTHER"),
  email: Joi.string()
    .email({ tlds: { allow: ["gmail", "com", "net"] } })
    .required(),
});

const validationSignUp = async (req, res, next) => {
  try {
    await schemaSignUp.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.details[0].message);
  }
};

module.exports = {
  validationSignUp,
};
