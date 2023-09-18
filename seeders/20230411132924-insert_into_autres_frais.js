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

    const dateStr = "2022-01-01";
    const dateStrFin = "2024-01-01";
    const dateArr = dateStr.split("-");
    const dateArr2 = dateStrFin.split("-");
    const date_debut = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    const date_fin = new Date(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);

    await queryInterface.bulkInsert("Autre_frais", [
      {
        auf_libelle: "Application fees",
        auf_ht: 12.92,
        auf_ttc: 15,
        auf_debut: date_debut,
        auf_fin: date_fin,
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
