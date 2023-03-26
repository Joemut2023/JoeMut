'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quantite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quantite.belongsTo(models.Taille,{
        foreignKey:"tai_id"
      })
      Quantite.belongsTo(models.Produit,{
        foreignKey:"pro_id"
      })
    }
  }
  Quantite.init({
    qua_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tai_id: DataTypes.INTEGER,
    pro_id: DataTypes.INTEGER,
    qua_nbre: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quantite',
    timestamps:false
  });
  return Quantite;
};