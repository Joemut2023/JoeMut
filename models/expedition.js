"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expedition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expedition.belongsTo(models.Transporteur, {
        foreignKey: "trs_id",
      });
      Expedition.belongsTo(models.Statut_expedition, {
        foreignKey: "ste_id",
      });
      Expedition.belongsTo(models.Client, {
        foreignKey: "cli_id",
      });
      Expedition.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
      Expedition.hasMany(models.Detail_expedition, {
        foreignKey: "exp_id",
      });
      Expedition.belongsTo(models.Document, {
        foreignKey: "doc_id",
      });
       Expedition.belongsTo(models.User, {
         foreignKey: "usr_id",
       });
    }
  }
  Expedition.init(
    {
      exp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      trs_id: DataTypes.INTEGER,
      ste_id: DataTypes.INTEGER,
      cli_id: DataTypes.INTEGER,
      doc_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      exp_depart: DataTypes.DATE,
      exp_poids: DataTypes.FLOAT,
      exp_cout: DataTypes.FLOAT,
      exp_suivi: DataTypes.STRING,
      exp_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Expedition",
      timestamps: false,
    }
  );
  return Expedition;
};
