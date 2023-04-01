"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apply.belongsTo(models.Promo,{
        foreignKey:"prm_id"
      });
      Apply.belongsTo(models.Produit,{
        foreignKey:"pro_id"
      });
    }
  }
  Apply.init(
    {
      app_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prm_id: DataTypes.INTEGER,
      pro_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Apply",
      timestamps: false,
      tableName:'Applies'
    }
  );
  return Apply;
};
