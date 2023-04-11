"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Frais_ports", "frp_description", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Frais_ports", "frp_img", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Frais_ports", "frp_ht", {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn("Frais_ports", "frp_ttc", {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.removeColumn("Frais_ports", "frp_montant");
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
