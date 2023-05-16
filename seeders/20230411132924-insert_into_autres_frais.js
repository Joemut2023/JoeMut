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

    const dateStr = "2024-01-01";
    const dateArr = dateStr.split("-");
    const dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

    await queryInterface.bulkInsert("Autre_frais", [
      {
        auf_libelle: "Frais de dossier",
        auf_ht: 12.92,
        auf_ttc: 15.5,
        auf_debut: dateObj,
        auf_fin: dateObj,
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
