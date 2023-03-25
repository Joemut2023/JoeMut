'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Couleur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Couleur.init({
    cou_id: DataTypes.INTEGER,
    cou_libelle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Couleur',
  });
  return Couleur;
};