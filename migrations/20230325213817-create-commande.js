'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commandes', {
      com_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      frp_id: {
        type: Sequelize.INTEGER
      },
      cli_id: {
        type: Sequelize.INTEGER
      },
      com_num: {
        type: Sequelize.STRING
      },
      com_date: {
        type: Sequelize.DATE
      },
      com_debut_spectacle: {
        type: Sequelize.DATEONLY
      },
      com_fin_spectacle: {
        type: Sequelize.DATEONLY
      },
      com_remise: {
        type: Sequelize.DECIMAL
      },
      com_ht: {
        type: Sequelize.DECIMAL
      },
      com_tva: {
        type: Sequelize.DECIMAL
      },
      com_port: {
        type: Sequelize.DECIMAL
      },
      com_ttc: {
        type: Sequelize.DECIMAL
      },
      com_comment: {
        type: Sequelize.TEXT
      },
      com_adr_liv: {
        type: Sequelize.INTEGER
      },
      com_adr_fac: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Commandes');
  }
};