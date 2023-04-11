'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Mode_liv_spectacles", {
      mls_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mls_libelle: {
        type: Sequelize.STRING,
      }
    });
    await queryInterface.addColumn("Frais_ports", "mls_id",{
       type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Frais_ports", {
      fields: ["mls_id"],
      type: "foreign key",
      name: "mls_id_in_fr_port",
      references: {
        field: "mls_id",
        table: "Mode_liv_spectacles",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mode_liv_spectacles');
  }
};