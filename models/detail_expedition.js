"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_expedition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail_expedition.belongsTo(models.Expedition, {
        foreignKey: "exp_id",
      });
      Detail_expedition.belongsTo(models.Produit, {
        foreignKey: "pro_id",
      });
      Detail_expedition.belongsTo(models.Taille, {
        foreignKey: "tai_id",
      });
      Detail_expedition.belongsTo(models.Couleur, {
        foreignKey: "cou_id",
      });
      Detail_expedition.hasMany(models.Retour, {
        foreignKey: "dex_id",
      });
    }
  }
  Detail_expedition.init(
    {
      dex_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pro_id: DataTypes.INTEGER,
      tai_id: DataTypes.INTEGER,
      exp_id: DataTypes.INTEGER,
      cou_id: DataTypes.INTEGER,
      dex_nbre: DataTypes.INTEGER,
      dex_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Detail_expedition",
      timestamps: false,
    }
  );
  return Detail_expedition;
};
