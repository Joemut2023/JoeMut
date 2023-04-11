"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Clients", "cli_newsletter", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn("Clients", "cli_activation", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn("Clients", "cli_partenaire", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn("Clients", "cli_inscription", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Clients", "cli_last_in", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
