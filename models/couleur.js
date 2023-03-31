"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Couleur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Couleur.hasMany(models.Coloris, {
        foreignKey: "cou_id",
      });
      Couleur.hasMany(models.Mouvement, {
        foreignKey: "cou_id",
      });
    }
  }
  Couleur.init(
    {
      cou_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cou_libelle: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Couleur",
    }
  );
  return Couleur;
};
