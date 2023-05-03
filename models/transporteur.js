'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transporteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transporteur.hasMany(models.Expedition, {
        foreignKey: "trs_id",
      });
    }
  }
  Transporteur.init(
    {
      trs_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true
      },
      trs_libelle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transporteur",
      timestamps:false
    }
  );
  return Transporteur;
};