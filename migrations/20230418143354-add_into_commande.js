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
    await queryInterface.addColumn("Commandes","com_frais",{
      type:Sequelize.FLOAT
    })
     await queryInterface.changeColumn("Commandes", "com_port", {
       type: Sequelize.FLOAT,
     });
      await queryInterface.addColumn("Commandes", "com_infos", {
        type: Sequelize.STRING,
      });
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
