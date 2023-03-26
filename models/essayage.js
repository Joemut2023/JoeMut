"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Essayage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Essayage.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
    }
  }
  Essayage.init(
    {
      ess_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      com_id: DataTypes.INTEGER,
      ess_repetition: DataTypes.DATEONLY,
      ess_comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Essayage",
    }
  );
  return Essayage;
};
