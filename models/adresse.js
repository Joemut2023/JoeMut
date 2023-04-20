"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Adresse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adresse.belongsTo(models.Client, {
        foreignKey: "cli_id",
      });
      Adresse.hasMany(models.Commande,{
        foreignKey:"com_adr_liv"
      })
        Adresse.hasMany(models.Commande, {
          foreignKey: "com_adr_fac",
        });
    }
  }
  Adresse.init(
    {
      adr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cli_id: DataTypes.INTEGER,
      adr_structure: DataTypes.STRING,
      adr_nom: DataTypes.STRING,
      adr_prenom: DataTypes.STRING,
      adr_societe: DataTypes.STRING,
      adr_adresse: DataTypes.STRING,
      adr_comp: DataTypes.STRING,
      adr_cp: DataTypes.STRING,
      adr_ville: DataTypes.STRING,
      adr_num_tva: DataTypes.STRING,
      adr_phone: {
        type:DataTypes.STRING,
        defaultValue:null
      },
      adr_pays: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Adresse",
      timestamps: false,
    }
  );
  return Adresse;
};
