'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type_media.init({
    tym_id: DataTypes.INTEGER,
    tym_libelle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Type_media',
  });
  return Type_media;
};