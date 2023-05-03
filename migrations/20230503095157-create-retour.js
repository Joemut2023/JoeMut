'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Retours", {
      ret_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      dex_id: {
        type: Sequelize.INTEGER,
      },
      ret_nbre: {
        type: Sequelize.INTEGER,
      },
      ret_date: {
        type: Sequelize.DATE,
      },
      ret_comment: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Retours');
  }
};