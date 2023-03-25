'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Paniers', {
      pan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      com_id: {
        type: Sequelize.INTEGER
      },
      tar_id: {
        type: Sequelize.INTEGER
      },
      pan_qte: {
        type: Sequelize.INTEGER
      },
      pan_ht: {
        type: Sequelize.DECIMAL
      },
      pan_remise: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Paniers');
  }
};