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
      mop_libelle:'Carte bancaire',
      mop_actif:true
    },
    {
      mop_libelle:'Chèque',
        mop_actif:true
    },
    {
      mop_libelle:'Espèces',
        mop_actif:true
    },
    {
      mop_libelle:'Ordre de prélèvement',
      mop_actif:true
    },
    {
      mop_libelle:'Virement bancaire',
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
