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
    await queryInterface.removeColumn('Couleurs', 'createdAt');
    await queryInterface.removeColumn('Couleurs', 'updatedAt');
    await queryInterface.removeColumn('Type_categories', 'createdAt');
    await queryInterface.removeColumn('Type_categories', 'updatedAt');
    await queryInterface.removeColumn('Type_media', 'createdAt');
    await queryInterface.removeColumn('Type_media', 'updatedAt');
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
