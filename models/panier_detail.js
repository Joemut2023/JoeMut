"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panier_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Panier_detail.belongsTo(models.Panier, {
        foreignKey: "pan_id",
      });
      Panier_detail.belongsTo(models.Produit, {
        foreignKey: "pro_id",
      });
      Panier_detail.belongsTo(models.Promo, {
        foreignKey: "prm_id",
      });
      Panier_detail.belongsTo(models.Tarif, {
        foreignKey: "tar_id",
      });
    }
  }
  Panier_detail.init(
    {
      pad_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      pro_id: DataTypes.INTEGER,
      tar_id: DataTypes.INTEGER,
      prm_id: DataTypes.INTEGER,
      pan_id: DataTypes.INTEGER,
      pad_qte: DataTypes.INTEGER,
      pad_ht: DataTypes.FLOAT,
      pad_remise: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Panier_detail",
      timestamps:false
    }
  );
  return Panier_detail;
};
