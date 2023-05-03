"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Retour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Retour.belongsTo(models.Detail_expedition, {
        foreignKey: "dex_id",
      });
        Retour.belongsTo(models.User, {
          foreignKey: "usr_id",
        });
    }
  }
  Retour.init(
    {
      ret_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usr_id: DataTypes.INTEGER,
      dex_id: DataTypes.INTEGER,
      ret_nbre: DataTypes.INTEGER,
      ret_date: {
        type: DataTypes.DATE,
      },
      ret_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Retour",
      timestamps: false,
    }
  );
  return Retour;
};
