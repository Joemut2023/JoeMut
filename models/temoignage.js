'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temoignage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Temoignage.belongsTo(models.Client,{
        foreignKey:'cli_id'
      })
    }
  }
  Temoignage.init({
    tmg_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    cli_id: DataTypes.INTEGER,
    tmg_content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Temoignage',
    timestamps:false
  });
  return Temoignage;
};