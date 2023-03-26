"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Adresses", {
      adr_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cli_id: {
        type: Sequelize.INTEGER,
      },
      adr_structure: {
        type: Sequelize.STRING,
      },
      adr_nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adr_prenom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adr_societe: {
        type: Sequelize.STRING,
      },
      adr_adresse: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adr_comp: {
        type: Sequelize.STRING,
      },
      adr_cp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adr_ville: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adr_num_tva: {
        type: Sequelize.STRING,
      },
      adr_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("Adresses", {
      name: "fk_adresse_client",
      type: "foreign key",
      fields: ["cli_id"],
      references: {
        table: "Clients",
        field: "cli_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Adresses");
  },
};
