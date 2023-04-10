"use strict";

const {
  COSTUMES_POUR_PETITS,COSTUMES_POUR_MOYENS,COSTUMES_POUR_GRANDS,
  ACCESSOIRES_LIST,
} = require("../helpers/categories");
const {
  PETITS,
  MOYENS,
  GRANDS,
  ACCESSOIRES,
} = require("../helpers/type_categories");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const list_for_petits = [];
    const list_for_moyens = [];
    const list_for_grands = [];
    const list_for_accessoires = [];

    COSTUMES_POUR_PETITS.map((costume) => {
      list_for_petits.push({ tyc_id: PETITS, cat_libelle: costume });
    });

    COSTUMES_POUR_MOYENS.map((costume) => {
      list_for_moyens.push({ tyc_id: MOYENS, cat_libelle: costume });
    });
    COSTUMES_POUR_GRANDS.map((costume) => {
      list_for_grands.push({ tyc_id: GRANDS, cat_libelle: costume });
    });
    ACCESSOIRES_LIST.map((accessoire) => {
      list_for_accessoires.push({
        tyc_id: ACCESSOIRES,
        cat_libelle: accessoire,
      });
    });
    await queryInterface.bulkInsert("Categories", list_for_petits);
    await queryInterface.bulkInsert("Categories", list_for_moyens);
    await queryInterface.bulkInsert("Categories", list_for_grands);
    await queryInterface.bulkInsert("Categories", list_for_accessoires);

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
