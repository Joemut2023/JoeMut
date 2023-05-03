"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profil, {
        foreignKey: "prf_id",
      });
      User.hasMany(models.Chronologie, {
        foreignKey: "usr_id",
      });
      User.hasMany(models.Document, {
        foreignKey: "usr_id",
      });
      User.hasMany(models.Retour, {
        foreignKey: "usr_id",
      });
      User.hasMany(models.Expedition, {
        foreignKey: "usr_id",
      });
    }
  }
  User.init(
    {
      usr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prf_id: DataTypes.INTEGER,
      usr_nom: DataTypes.STRING,
      usr_prenom: DataTypes.STRING,
      usr_mail: DataTypes.STRING,
      usr_pwd: DataTypes.STRING,
      usr_init: DataTypes.DATE,
      usr_last_con: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
