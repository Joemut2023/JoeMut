"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commande.hasMany(models.Mouvement, {
        foreignKey: "com_id",
      });
      Commande.hasMany(models.Essayage,{
        foreignKey:'com_id'
      })
      Commande.belongsTo(models.Frais_port,{
        foreignKey:'frp_id'
      })
      Commande.hasMany(models.Frais_supp,{
        foreignKey:'com_id'
      });
      Commande.belongsTo(models.Client,{
        foreignKey:'cli_id'
      })
      Commande.belongsTo(models.Panier,{
        foreignKey:'pan_id'
      })

    }
  }
  Commande.init(
    {
      com_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      frp_id: DataTypes.INTEGER,
      cli_id: DataTypes.INTEGER,
      com_num: {
        type:DataTypes.TEXT,
        defaultValue:(new Date(new Date().setDate(new Date().getDate()))).toString()
      },
      com_date: {
        type:DataTypes.DATE,
        defaultValue:new Date(new Date().setDate(new Date().getDate()))
      },
      com_debut_spectacle: DataTypes.DATEONLY,
      com_fin_spectacle: DataTypes.DATEONLY,
      com_remise: DataTypes.DECIMAL,
      com_ht: DataTypes.DECIMAL,
      com_tva: DataTypes.DECIMAL,
      com_port: DataTypes.FLOAT,
      com_frais : DataTypes.FLOAT,
      com_ttc: DataTypes.DECIMAL,
      com_infos:DataTypes.STRING,
      com_comment: DataTypes.TEXT,
      com_adr_liv: DataTypes.INTEGER,
      com_adr_fac: DataTypes.INTEGER,
      pan_id:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Commande",
      timestamps: false,
    }
  );
  return Commande;
};
