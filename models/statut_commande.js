"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Statut_commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Statut_commande.hasMany(models.Chronologie, {
        foreignKey: "stc_id",
      });
    }
  }
  Statut_commande.init(
    {
      stc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stc_libelle: DataTypes.STRING,
      stc_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Statut_commande",
      timestamps: false,
    }
  );
  return Statut_commande;
};
