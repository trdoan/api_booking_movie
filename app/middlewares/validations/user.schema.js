const Joi = require("joi");

const createUserSchema = Joi.object({
  fullName: Joi.string().min(6).max(30).required().messages({
    "string.base": `"fullName" phải chuỗi`,
    "string.empty": `"fullName" không được để trống`,
    "string.min": `"fullName" phải có ít nhất {#limit} ký tự`,
    "string.max": `"fullName" có tối đa {#limit} ký tự`,
    "any.required": `"fullName" là trường bắt buộc`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["vn", "com"] },
    })
    .required()
    .messages({
      "string.base": `"email" phải chuỗi`,
      "string.empty": `"email" không được để trống`,
      "string.email": `"email" không đúng định dạng, chúng tôi chỉ nhận các email có top domain: .vn, .com`,
      "any.required": `"email" là trường bắt buộc`,
    }),
  sex: Joi.string().valid("MALE", "FEMALE", "OTHER").messages({ "any.only": `"sex" không hợp lệ` }),
  role: Joi.string()
    .valid("CLIENT", "ADMIN", "SPADMIN")
    .messages({ "any.only": `"role" không hợp lệ` }),
  password: Joi.string().min(6).required().messages({
    "string.base": `"password" phải chuỗi`,
    "string.empty": `"password" không được để trống`,
    "string.min": `"password" phải có ít nhất {#limit} ký tự`,
    "any.required": `"password" là trường bắt buộc`,
  }),
  repeatPassword: Joi.ref("password"),
})
  .with("password", "repeatPassword")
  .messages({
    "object.with": `"repeatPassword" không được để trống`,
    "any.only": `"repeatPassword" không đúng`,
  });

module.exports = { createUserSchema };
