"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.belongsTo(models.Produit, {
        foreignKey: "pro_id",
      });
      Media.belongsTo(models.Type_media, {
        foreignKey: "tym_id",
      });
    }
  }
  Media.init(
    {
      med_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      pro_id: DataTypes.INTEGER,
      tym_id: DataTypes.INTEGER,
      med_libelle: DataTypes.STRING,
      med_ressource: DataTypes.STRING,
      mimetype: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Media",
      timestamps: false,
      tableName:'Medias'
    }
  );
  return Media;
};
