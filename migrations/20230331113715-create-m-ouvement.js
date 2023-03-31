"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Mouvements", {
      mvt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cli_id: {
        type: Sequelize.INTEGER,
      },
      cou_id: {
        type: Sequelize.INTEGER,
      },
      pro_id: {
        type: Sequelize.INTEGER,
      },
      tai_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      mvt_nbre: {
        type: Sequelize.INTEGER,
      },
      mvt_depart: {
        type: Sequelize.DATE,
      },
      mvt_retour: {
        type: Sequelize.DATE,
      },
      mvt_statut: {
        type: Sequelize.INTEGER,
      },
      mvt_comment: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.addConstraint("Mouvements", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_from_Commandes_to_Mouvements",
      references: {
        table: "Commandes",
        field: "com_id",
      },
    });
    await queryInterface.addConstraint("Mouvements", {
      fields: ["tai_id"],
      type: "foreign key",
      name: "tai_id_from_Tailles_to_Mouvements",
      references: {
        table: "Tailles",
        field: "tai_id",
      },
    });
    await queryInterface.addConstraint("Mouvements", {
      fields: ["pro_id"],
      type: "foreign key",
      name: "pro_id_from_Produits_to_Mouvements",
      references: {
        table: "Produits",
        field: "pro_id",
      },
    });
    await queryInterface.addConstraint("Mouvements", {
      fields: ["cou_id"],
      type: "foreign key",
      name: "cou_id_from_Couleurs_to_Mouvements",
      references: {
        table: "Couleurs",
        field: "cou_id",
      },
    });
    await queryInterface.addConstraint("Mouvements", {
      fields: ["cli_id"],
      type: "foreign key",
      name: "cli_id_from_Clients_to_Mouvements",
      references: {
        table: "Clients",
        field: "cli_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Mouvements");
  },
};
