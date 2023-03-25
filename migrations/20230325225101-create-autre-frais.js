'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Autre_frais', {
      auf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      auf_libelle: {
        type: Sequelize.TEXT
      },
      auf_montant: {
        type: Sequelize.DECIMAL
      },
      auf_debut: {
        type: Sequelize.DATEONLY
      },
      auf_fin: {
        type: Sequelize.DATEONLY
      },
      auf_actif: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Autre_frais');
  }
};