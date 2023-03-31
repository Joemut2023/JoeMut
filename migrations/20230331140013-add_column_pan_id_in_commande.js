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
    await queryInterface.addColumn('Commandes','pan_id',{
      type: Sequelize.INTEGER,
    })
    await queryInterface.addConstraint('Commandes',{
      fields:["pan_id"],
      type:"foreign key",
      name:"pan_id_fk_pan_details",
      references:{
        table:"Paniers",
        field:"pan_id",
      }
    })
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
