'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Promos', {
      prm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      prm_code: {
        type: Sequelize.TEXT
      },
      prm_pourcent: {
        type: Sequelize.INTEGER
      },
      prm_valeur: {
        type: Sequelize.DOUBLE
      },
      prm_debut: {
        type: Sequelize.DATEONLY
      },
      prm_fin: {
        type: Sequelize.DATEONLY
      },
      prm_actif: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Promos');
  }
};