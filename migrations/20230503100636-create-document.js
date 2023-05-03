"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Documents", {
      doc_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tdo_id: {
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      doc_ref: {
        type: Sequelize.STRING,
      },
      doc_date: {
        type: Sequelize.DATE,
      },
      doc_libelle: {
        type: Sequelize.STRING,
      },
      doc_localisation: {
        type: Sequelize.STRING,
      },
      doc_comment: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.addConstraint("Documents", {
      fields: ["tdo_id"],
      type: "foreign key",
      name: "tdo_id_from_Type_documents_to_Documents",
      references: {
        table: "Type_documents",
        field: "tdo_id",
      },
    });
    await queryInterface.addConstraint("Documents", {
      fields: ["usr_id"],
      type: "foreign key",
      name: "usr_id_from_Users_to_Documents",
      references: {
        table: "Users",
        field: "usr_id",
      },
    });
    await queryInterface.addConstraint("Documents", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_from_commandes_to_Documents",
      references: {
        table: "Commandes",
        field: "com_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Documents");
  },
};
