'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Moyen_paiements',[
    {
      mop_libelle:'Bank card',
      mop_actif:true
    },
    {
      mop_libelle:'Check',
        mop_actif:true
    },
    {
      mop_libelle:'Species',
        mop_actif:true
    },
    {
      mop_libelle:'Collection order',
      mop_actif:true
    },
    {
      mop_libelle:'Bank transfer',
      mop_actif:true
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
