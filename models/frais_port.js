"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Frais_port extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Frais_port.hasMany(models.Commande, {
        foreignKey: "frp_id",
      });
    }
  }
  Frais_port.init(
    {
      frp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      frp_libelle: DataTypes.TEXT,
      frp_montant: DataTypes.DECIMAL,
      frp_debut: DataTypes.DATEONLY,
      frp_fin: DataTypes.DATEONLY,
      frp_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Frais_port",
      timestamps: false,
    }
  );
  return Frais_port;
};
