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
      name:'fk_paniers_tarif',
      type:'foreign key',
      fields:['tar_id'],
      references:{
        table:'Tarifs',
        field:"tar_id"
      }
    });
    await queryInterface.addConstraint('Commandes',{
      name:'fk_commande_fraisport',
      type:'foreign key',
      fields:['frp_id'],
      references:{
        table:'Frais_ports',
        field:"frp_id"
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
