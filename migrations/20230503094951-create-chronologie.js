"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Chronologies", {
      chr_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stc_id: {
        type: Sequelize.INTEGER,
      },
      com_id: {
        type: Sequelize.INTEGER,
      },
      usr_id: {
        type: Sequelize.INTEGER,
      },
      chr_date: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Chronologies", {
      fields: ["stc_id"],
      type: "foreign key",
      name: "stc_id_from_statut_commande_to_chronologies",
      references: {
        table: "Statut_commandes",
        field: "stc_id",
      },
    });
    await queryInterface.addConstraint("Chronologies", {
      fields: ["com_id"],
      type: "foreign key",
      name: "com_id_from_commande_to_chronologies",
      references: {
        table: "Commandes",
        field: "com_id",
      },
    });
    await queryInterface.addConstraint("Chronologies", {
      fields: ["usr_id"],
      type: "foreign key",
      name: "usr_id_from_user_to_chronologies",
      references: {
        table: "Users",
        field: "usr_id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Chronologies");
  },
};
