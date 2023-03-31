"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promo.hasMany(models.Apply,{
        foreignKey:"prm_id"
      })
      Promo.hasMany(models.Panier_detail,{
        foreignKey:"prm_id"
      })
    }
  }
  Promo.init(
    {
      prm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prm_code: DataTypes.TEXT,
      prm_pourcent: DataTypes.INTEGER,
      prm_valeur: DataTypes.DOUBLE,
      prm_debut: DataTypes.DATEONLY,
      prm_fin: DataTypes.DATEONLY,
      prm_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Promo",
      timestamps: false,
    }
  );
  return Promo;
};
