"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suggestion.belongsTo(models.Client, {
        foreignKey: "cli_id",
      });
      Suggestion.belongsTo(models.Produit, {
        foreignKey: "prod_id",
      });
    }
  }
  Suggestion.init(
    {
      sug_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pro_id: DataTypes.INTEGER,
      cli_id: DataTypes.INTEGER,
      sug_comment: DataTypes.INTEGER,
      sug_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Suggestion",
    }
  );
  return Suggestion;
};
