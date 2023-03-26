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
    await queryInterface.addConstraint('Applies',{
      fields:['pro_id'],
      type:"foreign key",
      name:"pro_id_from_produit_to_applies",
      references:{
        table:"Produits",
        field:"pro_id"
      }
    })
    await queryInterface.addConstraint('Applies',{
      fields:['prm_id'],
      type:"foreign key",
      name:"prm_id_from_produit_to_applies",
      references:{
        table:"Promos",
        field:"prm_id"
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
