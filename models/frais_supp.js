"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Frais_supp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Frais_supp.belongsTo(models.Autre_frais,{
        foreignKey:"auf_id"
      })
      Frais_supp.belongsTo(models.Commande,{
        foreignKey:"com_id"
      })
    }
  }
  Frais_supp.init(
    {
      frs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      com_id: DataTypes.INTEGER,
      auf_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Frais_supp",
      timestamps: false,
    }
  );
  return Frais_supp;
};
