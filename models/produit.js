"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produit.belongsTo(models.Categorie, {
        foreignKey: "cat_id",
      });
      Produit.hasMany(models.Quantite, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Media, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Coloris, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Suggestion, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Panier, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Apply, {
        foreignKey: "pro_id",
      });
      Produit.hasMany(models.Tarif, {
        foreignKey: "pro_id",
      });

      Produit.hasMany(models.Mouvement, {
        foreignKey: "pro_id",
      });

      Produit.hasMany(models.Panier_detail,{
        foreignKey:"pro_id",
      })
    }
  }
  Produit.init(
    {
      pro_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cat_id: DataTypes.INTEGER,
      pro_ref: DataTypes.STRING,
      pro_libelle: DataTypes.STRING,
      pro_description: DataTypes.STRING,
      pro_details: DataTypes.STRING,
      pro_new_collect: DataTypes.BOOLEAN,
      pro_en_avant: DataTypes.BOOLEAN,
      pro_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Produit",
    }
  );
  return Produit;
};
