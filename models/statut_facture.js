'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statut_facture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statut_facture.init(
    {
      stf_id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      stf_libelle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Statut_facture",
      timestamps: false,
    }
  );
  return Statut_facture;
};