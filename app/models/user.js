"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      sex: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE", "OTHER"],
        defaultValue: "MALE",
      },
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      role: {
        type: DataTypes.ENUM,
        values: ["CLIENT", "ADMIN", "SPADMIN"],
        defaultValue: "CLIENT",
      },
      avatar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
