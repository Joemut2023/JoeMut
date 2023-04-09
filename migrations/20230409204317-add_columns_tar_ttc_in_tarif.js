"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Tarifs', 'tar_ht', {
      type: Sequelize.DOUBLE,
      allowNull:true,

    });
    await queryInterface.addColumn('Tarifs', 'tar_ttc', {
      type: Sequelize.DOUBLE,
    }); 
    await queryInterface.addColumn('Tarifs', 'tar_statut', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn('Tarifs', 'tar_montant');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
