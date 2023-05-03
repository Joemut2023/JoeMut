'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moyen_paiement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Moyen_paiement.init(
    {
      mop_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      mop_libelle: DataTypes.STRING,
      mop_actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Moyen_paiement",
      timestamps: false,
    }
  );
  return Moyen_paiement;
};