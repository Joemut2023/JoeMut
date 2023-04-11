"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Autre_frais", "auf_ht", {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn("Autre_frais", "auf_ttc", {
      type: Sequelize.DOUBLE,
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
