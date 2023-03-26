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
      Client.belongsTo(models.tit_id, {
        foreignKey: "tit_id",
      });
      Client.hasMany(models.Adresse, {
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
      cli_num: DataTypes.STRING,
      cli_mail: DataTypes.STRING,
      cli_login: DataTypes.STRING,
      cli_fonction: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Client",
      timestamps: false,
    }
  );
  return Client;
};
