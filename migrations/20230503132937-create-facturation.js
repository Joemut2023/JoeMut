"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Facturations", {
      fac_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doc_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      stf_id: {
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      fac_date: {
        type: Sequelize.DATE,
      },
      fac_montant: {
        type: Sequelize.FLOAT,
      },
      fac_comment: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addConstraint("Facturations", {
      fields: ["doc_id"],
      type: "foreign key",
      name: "doc_id_fk_fac",
      references: {
        field: "doc_id",
        table: "Documents",
      },
    });
    await queryInterface.addConstraint("Facturations", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_fk_fac",
      references: {
        field: "com_id",
        table: "Commandes",
      },
    });
    await queryInterface.addConstraint("Facturations", {
      fields: ["usr_id"],
      type: "foreign key",
      name: "usr_id_fk_fac",
      references: {
        field: "usr_id",
        table: "Users",
      },
    });
    await queryInterface.addConstraint("Facturations", {
      fields: ["stf_id"],
      type: "foreign key",
      name: "stf_id_fk_fac",
      references: {
        field: "stf_id",
        table: "Statut_factures",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Facturations");
  },
};
