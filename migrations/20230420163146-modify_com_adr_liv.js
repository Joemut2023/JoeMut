'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelicze.INTEGER });
     */
    await queryInterface.addConstraint('Commandes',{
      fields:['com_adr_liv'],
      type:"foreign key",
      name:"adr_id_in_commande_liv",
      references:{
        field:"adr_id",
        table:"Adresses"
      }
    })
     await queryInterface.addConstraint("Commandes", {
       fields: ["com_adr_fac"],
       type: "foreign key",
       name: "adr_id_in_commande_fac",
       references: {
         field: "adr_id",
         table: "Adresses",
       },
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
