"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profil.hasMany(models.User, {
        foreignKey: "prf_id",
      });
    }
  }
  Profil.init(
    {
      prf_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prf_libelle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profil",
      timestamps: false,
    }
  );
  return Profil;
};
