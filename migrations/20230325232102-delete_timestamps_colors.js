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
    await queryInterface.removeColumn('type_categories', 'createdAt');
    await queryInterface.removeColumn('type_categories', 'updatedAt');
    await queryInterface.removeColumn('type_media', 'createdAt');
    await queryInterface.removeColumn('type_media', 'updatedAt');
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
