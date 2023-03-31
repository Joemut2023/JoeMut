"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mouvement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mouvement.belongsTo(models.Client, {
        foreignKey: "cli_id",
      });
      Mouvement.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
      Mouvement.belongsTo(models.Couleur, {
        foreignKey: "cou_id",
      });
      Mouvement.belongsTo(models.Produit, {
        foreignKey: "pro_id",
      });
      Mouvement.belongsTo(models.Taille, {
        foreignKey: "tai_id",
      });
    }
  }
  Mouvement.init(
    {
      mvt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cli_id: DataTypes.INTEGER,
      cou_id: DataTypes.INTEGER,
      pro_id: DataTypes.INTEGER,
      tai_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      mvt_nbre: DataTypes.INTEGER,
      mvt_depart: DataTypes.DATE,
      mvt_retour: DataTypes.DATE,
      mvt_statut: DataTypes.INTEGER,
      mvt_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mouvement",
      timestamps: false,
    }
  );
  return Mouvement;
};
