'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coloris extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coloris.belongsTo(models.Product,{
        foreignKey:"pro_id"
      })
      Coloris.belongsTo(models.Taille,{
        foreignKey:"tai_id"
      })
    }
  }
  Coloris.init({
    clrs_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    pro_id: DataTypes.INTEGER,
    cou_id: DataTypes.INTEGER,
    tai_id: DataTypes.INTEGER,
    col_nbre: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Coloris',
  });
  return Coloris;
};