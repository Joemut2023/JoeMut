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
   await queryInterface.bulkInsert('Echeances',[
    {
      ech_libelle:'A réception',
      ech_delai:0,
      ech_statut:true
    },
    {
      ech_libelle:'15 jours',
      ech_delai:15,
      ech_statut:true
    },
    {
      ech_libelle:'30 jours',
      ech_delai:30,
      ech_statut:true
    },
    {
      ech_libelle:'45 jours',
      ech_delai:45,
      ech_statut:true
    },
    {
      ech_libelle:'60 jours',
      ech_delai:60,
      ech_statut:true
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
