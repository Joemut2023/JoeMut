'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Statut_expeditions", {
      ste_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ste_libelle: {
        type: Sequelize.STRING,
      },
      ste_actif: {
        type: Sequelize.BOOLEAN,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statut_expeditions');
  }
};