"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chronologie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chronologie.belongsTo(models.Statut_commande, {
        foreignKey: "stc_id",
      });
      Chronologie.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
      Chronologie.belongsTo(models.User, {
        foreignKey: "usr_id",
      });
    }
  }
  Chronologie.init(
    {
      chr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stc_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      chr_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Chronologie",
      timestamps: false,
    }
  );
  return Chronologie;
};
