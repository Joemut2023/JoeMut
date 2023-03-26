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
    await queryInterface.addConstraint('Frais_supps',{
      fields:['com_id'],
      type:"foreign key",
      name:"com_id_from_produit_to_Frais_supps",
      references:{
        table:"Commandes",
        field:"com_id"
      }
    })
    await queryInterface.addConstraint('Frais_supps',{
      fields:['auf_id'],
      type:"foreign key",
      name:"auf_id_from_produit_to_Frais_supps",
      references:{
        table:"Autre_frais",
        field:"auf_id"
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
