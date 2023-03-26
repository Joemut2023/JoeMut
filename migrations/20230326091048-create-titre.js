"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Titres", {
      tit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tit_libelle: {
        type: Sequelize.STRING, 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Titres");
  },
};
