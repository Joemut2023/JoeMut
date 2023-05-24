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
     },
     {
       tyc_libelle: "COSTUMES POUR MOYENS",
     },
     {
       tyc_libelle: "COSTUMES POUR GRANDS",
     },
     {
       tyc_libelle: "ACCESSOIRS",
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
