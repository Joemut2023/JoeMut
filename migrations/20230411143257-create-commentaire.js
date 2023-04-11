'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Commentaires", {
      cmt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cli_id: {
        type: Sequelize.INTEGER,
      },
      pro_id: {
        type: Sequelize.INTEGER,
      },
      cmt_titre: {
        type: Sequelize.STRING,
      },
      cmt_comment: {
        type: Sequelize.STRING,
      },
      cmt_date: {
        type: Sequelize.DATE,
      }
     
    });
    await queryInterface.addConstraint("Commentaires", {
      fields: ["cli_id"],
      type: "foreign key",
      name: "cli_fk_cmt",
      references: {
        field: "cli_id",
        table: "Clients",
      },
    }),
      await queryInterface.addConstraint("Commentaires", {
        fields: ["pro_id"],
        type: "foreign key",
        name: "pro_fk_cmt",
        references: {
          field: "pro_id",
          table: "Produits",
        },
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commentaires');
  }
};