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
   await queryInterface.bulkInsert("Type_categories", [
     {
       tyc_libelle: "COSTUMES POUR PETITS",
       tyc_ordre : 1
     },
     {
       tyc_libelle: "COSTUMES POUR MOYENS",
       tyc_ordre : 2
     },
     {
       tyc_libelle: "COSTUMES POUR GRANDS",
       tyc_ordre : 3
     },
     {
       tyc_libelle: "ACCESSOIRS",
       tyc_ordre : 4
     },
   ]);
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
