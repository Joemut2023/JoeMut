"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Expeditions", {
      exp_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trs_id: {
        type: Sequelize.INTEGER,
      },
      ste_id: {
        type: Sequelize.INTEGER,
      },
      cli_id: {
        type: Sequelize.INTEGER,
      },
      doc_id: {
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      exp_depart: {
        type: Sequelize.DATE,
      },
      exp_poids: {
        type: Sequelize.FLOAT,
      },
      exp_cout: {
        type: Sequelize.FLOAT,
      },
      exp_suivi: {
        type: Sequelize.STRING,
      },
      exp_comment: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addConstraint("Expeditions", {
      fields: ["trs_id"],
      type: "foreign key",
      name: "trs_id_in_exp",
      references: {
        field: "trs_id",
        table: "Transporteurs",
      },
    });
    await queryInterface.addConstraint("Expeditions", {
      fields: ["ste_id"],
      type: "foreign key",
      name: "ste_id_in_exp",
      references: {
        field: "ste_id",
        table: "Statut_expeditions",
      },
    });
    await queryInterface.addConstraint("Expeditions", {
      fields: ["cli_id"],
      type: "foreign key",
      name: "cli_id_in_exp",
      references: {
        field: "cli_id",
        table: "Clients",
      },
    });
    await queryInterface.addConstraint("Expeditions", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_in_exp",
      references: {
        field: "com_id",
        table: "Commandes",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Expeditions");
  },
};
