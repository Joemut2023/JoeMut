'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorie.hasMany(models.Produit,{
        foreignKey:"cat_id"
      })
      Categorie.belongsTo(models.Type_categorie,{
        foreignKey:"tyc_id"
      })
    }
  }
  Categorie.init({
    cat_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tyc_id: DataTypes.INTEGER,
    cat_libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
    timestamps:false
  });
  return Categorie;
};