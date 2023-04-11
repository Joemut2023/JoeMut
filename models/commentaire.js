"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commentaire.belongsTo(models.Client, {
        foreignKey: "cli_id",
      });
      Commentaire.belongsTo(models.Produit, {
        foreignKey: "pro_id",
      });
    }
  }
  Commentaire.init(
    {
      cmt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cli_id: DataTypes.INTEGER,
      pro_id: DataTypes.INTEGER,
      cmt_titre: DataTypes.STRING,
      cmt_comment: DataTypes.STRING,
      cmt_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Commentaire",
      timestamps:false
    }
  );
  return Commentaire;
};
