'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Mode_liv_essayages", {
      mle_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mle_libelle: {
        type: Sequelize.STRING,
      }
    });
    await queryInterface.addColumn("Frais_ports","mle_id",{
      type: Sequelize.INTEGER
    });
    await queryInterface.addConstraint("Frais_ports", {
      fields: ["mle_id"],
      type: "foreign key",
      name: "mle_id_in_fr_port",
      references: {
        field: "mle_id",
        table: "Mode_liv_essayages",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mode_liv_essayages');
  }
};