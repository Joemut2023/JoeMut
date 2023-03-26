"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Autre_frais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Autre_frais.hasMany(models.Frais_supp,{
        foreignKey:"auf_id"
      })
    }
  }
  Autre_frais.init(
    {
      auf_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      auf_libelle: DataTypes.TEXT,
      auf_montant: DataTypes.DECIMAL,
      auf_debut: DataTypes.DATEONLY,
      auf_fin: DataTypes.DATEONLY,
      auf_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Autre_frais",
      timestamps: false,
    }
  );
  return Autre_frais;
};
