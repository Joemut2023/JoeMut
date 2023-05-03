'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Moyen_paiements", {
      mop_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mop_libelle: {
        type: Sequelize.STRING,
      },
      mop_actif: {
        type: Sequelize.BOOLEAN,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Moyen_paiements');
  }
};