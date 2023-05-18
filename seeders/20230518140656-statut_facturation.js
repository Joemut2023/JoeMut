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
   await queryInterface.bulkInsert('Statut_factures',[
    {
      stf_libelle:'Brouillon',
      stf_actif:true
    },
    {
      stf_libelle:'Validée',
      stf_actif:true
    },
    {
      stf_libelle:'En attente de paiement',
      stf_actif:true
    },
    {
      stf_libelle:'Payée',
      stf_actif:true
    },
    {
      stf_libelle:'Impayée',
      stf_actif:true
    },
    {
      stf_libelle:'En recouvrement',
      stf_actif:true
    },
    {
      stf_libelle:'Abandonnée',
      stf_actif:true
    },
    {
      stf_libelle:'Avoir',
      stf_actif:true
    },
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
