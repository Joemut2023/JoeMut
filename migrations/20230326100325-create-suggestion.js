"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Suggestions", {
      sug_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cli_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sug_comment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sug_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("Suggestions", {
      name: "fk_suggestion_client",
      type: "foreign key",
      fields: ["cli_id"],
      references: {
        table: "Clients",
        field: "cli_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Suggestions");
  },
};
