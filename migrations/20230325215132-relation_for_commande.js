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
    await queryInterface.addConstraint('Paniers',{
      name:'fk_panier_commande',
      type:'foreign key',
      fields:['com_id'],
      references:{
        table:'Commandes',
        field:'com_id'
      }
    });
    await queryInterface.addConstraint('Essayages',{
      name:'fk_essayage_commande',
      type:'foreign key',
      fields:['com_id'],
      references:{
        table:'Commandes',
        field:"com_id"
      }
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
