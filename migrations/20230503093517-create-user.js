"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      usr_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prf_id: {
        type: Sequelize.INTEGER,
      },
      usr_nom: {
        type: Sequelize.STRING,
      },
      usr_prenom: {
        type: Sequelize.STRING,
      },
      usr_mail: {
        type: Sequelize.STRING,
      },
      usr_pwd: {
        type: Sequelize.STRING,
      },
      usr_init: {
        type: Sequelize.DATE,
      },
      usr_last_con: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Users", {
      fields: ["prf_id"],
      type: "foreign key",
      name: "prf_id_from_profil_to_user",
      references: {
        table: "Profils",
        field: "prf_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
