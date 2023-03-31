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
    await queryInterface.removeColumn('Paniers','com_id')
    await queryInterface.removeColumn('Paniers','pan_qte')
    await queryInterface.removeColumn('Paniers','pan_ht')
    await queryInterface.removeColumn('Paniers','pan_remise')
    await queryInterface.removeColumn('Paniers','tar_id')
    await queryInterface.removeColumn('Paniers','pro_id')
    await queryInterface.addColumn('Paniers','cli_id',{
       type:Sequelize.INTEGER,

    })
    await queryInterface.addColumn('Paniers','pan_date',{
      type:Sequelize.DATE

   })

   await queryInterface.addConstraint('Paniers',
   { fields:['cli_id'],
   type:"foreign key",
   name:"cli_id_from_Cleint_to_Paniers",
   references:{
     table:"Clients",
     field:"cli_id"
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
