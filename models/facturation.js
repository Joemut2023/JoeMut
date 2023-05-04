"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facturation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facturation.belongsTo(models.Document, {
        foreignKey: "doc_id",
      });
      Facturation.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
      Facturation.belongsTo(models.User, {
        foreignKey: "usr_id",
      });
      Facturation.belongsTo(models.Statut_facture, {
        foreignKey: "stf_id",
      });
    }
  }
  Facturation.init(
    {
      fac_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doc_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      stf_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      fac_date: DataTypes.DATE,
      fac_montant: DataTypes.FLOAT,
      fac_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Facturation",
      timestamps: true,
    }
  );
  return Facturation;
};
