'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Echeance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Echeance.hasMany(models.Facturation,{
        foreignKey:'ech_id'
      })
    }
  }
  Echeance.init({
    ech_id: DataTypes.INTEGER,
    ech_libelle: DataTypes.STRING,
    ech_delai: DataTypes.INTEGER,
    ech_statut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Echeance',
  });
  return Echeance;
};