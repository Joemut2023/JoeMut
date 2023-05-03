"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paiement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paiement.belongsTo(models.Document, {
        foreignKey: "doc_id",
      });
      Paiement.belongsTo(models.User, {
        foreignKey: "usr_id",
      });
      Paiement.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
       Paiement.belongsTo(models.Moyen_paiement, {
         foreignKey: "mop_id",
       });
    }
  }
  Paiement.init(
    {
      pai_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      doc_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      mop_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      pai_ref: DataTypes.STRING,
      pai_date: DataTypes.DATE,
      pai_montant: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Paiement",
      timestamps: false,
    }
  );
  return Paiement;
};
