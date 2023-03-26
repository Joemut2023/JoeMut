"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type_categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type_categorie.init(
    {
      tyc_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tyc_libelle: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Type_categorie",
      timestamps: false,
    }
  );
  return Type_categorie;
};
