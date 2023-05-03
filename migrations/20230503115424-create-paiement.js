"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Paiements", {
      pai_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doc_id: {
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      mop_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      pai_ref: {
        type: Sequelize.STRING,
      },
      pai_date: {
        type: Sequelize.DATE,
      },
      pai_montant: {
        type: Sequelize.FLOAT,
      },
    });

    await queryInterface.addConstraint("Paiements", {
      fields: ["doc_id"],
      type: "foreign key",
      name: "doc_id_fk_pai",
      references: {
        field: "doc_id",
        table: "Documents",
      },
    });
    await queryInterface.addConstraint("Paiements", {
      fields: ["usr_id"],
      type: "foreign key",
      name: "usr_id_fk_pai",
      references: {
        field: "usr_id",
        table: "Users",
      },
    });
    await queryInterface.addConstraint("Paiements", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_fk_pai",
      references: {
        field: "com_id",
        table: "Commandes",
      },
    });
    await queryInterface.addConstraint("Paiements", {
      fields: ["mop_id"],
      type: "foreign key",
      name: "mop_id_fk_pai",
      references: {
        field: "mop_id",
        table: "Moyen_paiements",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Paiements");
  },
};
