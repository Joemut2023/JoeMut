"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.Type_document, {
        foreignKey: "tdo_id",
      });
      Document.belongsTo(models.User, {
        foreignKey: "usr_id",
      });
      Document.belongsTo(models.Commande, {
        foreignKey: "com_id",
      });
      Document.hasMany(models.Expedition, {
        foreignKey: "doc_id",
      });
    }
  }
  Document.init(
    {
      doc_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tdo_id: DataTypes.INTEGER,
      usr_id: DataTypes.INTEGER,
      com_id: DataTypes.INTEGER,
      doc_ref: DataTypes.STRING,
      doc_date: DataTypes.DATE,
      doc_libelle: DataTypes.STRING,
      doc_localisation: DataTypes.STRING,
      doc_comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Document",
      timestamps: false,
    }
  );
  return Document;
};
