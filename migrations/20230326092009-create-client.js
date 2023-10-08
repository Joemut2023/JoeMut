"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clients", {
      cli_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tit_id: {
        type: Sequelize.INTEGER,
      },
      cli_num: {
        type: Sequelize.STRING,
      },
      cli_mail: {
        type: Sequelize.STRING,
      },
      cli_login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cli_fonction: {
        type: Sequelize.STRING,
      },
      cli_ticket: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.addConstraint("Clients", {
      name: "fk_client_titre",
      type: "foreign key",
      fields: ["tit_id"],
      references: {
        table: "Titres",
        field: "tit_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clients");
  },
};
