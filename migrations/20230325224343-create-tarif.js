'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarifs', {
      tar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      tar_debut: {
        type: Sequelize.DATEONLY
      },
      tar_fin: {
        type: Sequelize.DATEONLY
      },
      tar_montant: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tarifs');
  }
};