"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chair.init(
    {
      name: DataTypes.STRING,
      type: { type: DataTypes.ENUM, values: ["VIP", "CLASSIC"] },
      status: { type: DataTypes.ENUM, values: ["BOOKED", "BOOKING", "FREE"] },
      showTimeID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chair",
    }
  );
  return Chair;
};
