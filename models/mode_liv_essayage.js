'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mode_liv_essayage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mode_liv_essayage.hasMany(models.Frais_port,{
        foreignKey:"mle_id"
      });
    }
  }
  Mode_liv_essayage.init({
    mle_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    mle_libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mode_liv_essayage',
    timestamps:false,
  });
  return Mode_liv_essayage;
};