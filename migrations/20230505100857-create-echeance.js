'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Echeances', {
      ech_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ech_libelle: {
        type: Sequelize.STRING,
        allowNull:true
      },
      ech_delai: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      ech_statut: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Echeances');
  }
};