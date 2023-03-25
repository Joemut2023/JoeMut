'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Panier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Panier.init({
    pan_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    pro_id: DataTypes.INTEGER,
    com_id: DataTypes.INTEGER,
    tar_id: DataTypes.INTEGER,
    pan_qte: DataTypes.INTEGER,
    pan_ht: DataTypes.DECIMAL,
    pan_remise: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Panier',
  });
  return Panier;
};