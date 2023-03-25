'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Paniers', 'createdAt');
    await queryInterface.removeColumn('Paniers', 'updatedAt');
    await queryInterface.removeColumn('Commandes', 'createdAt');
    await queryInterface.removeColumn('Commandes', 'updatedAt');
    await queryInterface.removeColumn('Essayages', 'createdAt');
    await queryInterface.removeColumn('Essayages', 'updatedAt');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
