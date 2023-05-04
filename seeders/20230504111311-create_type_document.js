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
   await queryInterface.bulkInsert('Type_documents',[
    {
      tdo_libelle:'Devis'
    },
    {
      tdo_libelle:'Facture'
    },
    {
      tdo_libelle:'Bon de livraison'
    },
    {
      tdo_libelle:'Bon de facturation'
    },
    {
      tdo_libelle:"Bon d'essayage"
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
