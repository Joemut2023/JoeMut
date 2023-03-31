"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Taille extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Taille.hasMany(models.Quantite, {
        foreignKey: "tai_id",
      });
      Taille.hasMany(models.Coloris, {
        foreignKey: "tai_id",
      });
      Taille.hasMany(models.Mouvement, {
        foreignKey: "tai_id",
      });
    }
  }
  Taille.init(
    {
      tai_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tai_libelle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Taille",
      timestamps: false,
    }
  );
  return Taille;
};
