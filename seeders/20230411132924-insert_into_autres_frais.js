"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Autre_frais", [
      {
        auf_libelle: "Frais de dossier",
        auf_ht: 12.92,
        auf_ttc: 15.5,
        // auf_debut: 2023 - 01 - 01,
        // auf_fin: 0000 - 00 - 00,
        auf_actif: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
