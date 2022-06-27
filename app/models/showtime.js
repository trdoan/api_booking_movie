'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShowTime.init({
    startTime: DataTypes.DATE,
    roomID: DataTypes.INTEGER,
    movieID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShowTime',
  });
  return ShowTime;
};