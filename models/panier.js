"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Panier.hasMany(models.Panier_detail,{
        foreignKey:"pan_id"
      })
      Panier.hasOne(models.Commande,{
        foreignKey:"pan_id"
      })
      Panier.belongsTo(models.Client,{
        foreignKey:'cli_id'
      });
    }
  }
  Panier.init(
    {
      pan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pan_date: {
        type:DataTypes.DATE,
        defaultValue:new Date(new Date().setDate(new Date().getDate()))
      },
      cli_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Panier",
      timestamps:false
    }
  );
  return Panier;
};
