'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statut_expedition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statut_expedition.init(
    {
      ste_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      ste_libelle: DataTypes.STRING,
      ste_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Statut_expedition",
      timestamps:false
    }
  );
  return Statut_expedition;
};