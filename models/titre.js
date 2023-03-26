"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Titre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Titre.hasMany(models.Client, {
        foreignKey: "tit_id",
      });
    }
  }
  Titre.init(
    {
      tit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tit_libelle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Titre",
      timestamps: false,
    }
  );
  return Titre;
};
