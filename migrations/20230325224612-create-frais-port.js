'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Frais_ports', {
      frp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      frp_libelle: {
        type: Sequelize.TEXT
      },
      frp_montant: {
        type: Sequelize.DECIMAL
      },
      frp_debut: {
        type: Sequelize.DATEONLY
      },
      frp_fin: {
        type: Sequelize.DATEONLY
      },
      frp_actif: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Frais_ports');
  }
};