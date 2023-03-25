'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarif.init({
    tar_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    pro_id: DataTypes.INTEGER,
    tar_debut: DataTypes.DATEONLY,
    tar_fin: DataTypes.DATEONLY,
    tar_montant: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Tarif',
    timestamps:false
  });
  return Tarif;
};