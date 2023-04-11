"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.belongsTo(models.Titre, {
        foreignKey: "tit_id",
      });
      Client.hasMany(models.Adresse, {
        foreignKey: "cli_id",
      });
      Client.hasMany(models.Commande, {
        foreignKey: "cli_id",
      });
      Client.hasMany(models.Mouvement, {
        foreignKey: "cli_id",
      });
      Client.hasMany(models.Temoignage, {
        foreignKey: "cli_id",
      });
      Client.hasMany(models.Suggestion, {
        foreignKey: "cli_id",
      });
    }
  }
  Client.init(
    {
      cli_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tit_id: DataTypes.INTEGER,
      cli_prenom: DataTypes.STRING,
      cli_nom: DataTypes.STRING,
      cli_num: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cli_mail: DataTypes.STRING,
      cli_pwd: {
        type: DataTypes.STRING,
        defaultValue:
          "$2a$10$ye0JEbhTiG9Ugk.pZp3LWuFZ/xJNwtTBGSRz9zsO6Arh5vdHryP1K",
      },
      cli_fonction: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      cli_newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cli_activation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cli_partenaire: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cli_inscription: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cli_last_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Client",
      timestamps: false,
    }
  );
  return Client;
};
