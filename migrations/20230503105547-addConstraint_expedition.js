"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Expeditions", {
      fields: ["usr_id"],
      type: "foreign key",
      name: "usr_id_fk_exp",
      references: {
        field: "usr_id",
        table: "Users",
      },
    });
    await queryInterface.addConstraint("Expeditions", {
      fields: ["doc_id"],
      type: "foreign key",
      name: "doc_id_fk_exp",
      references: {
        field: "doc_id",
        table: "Documents",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
