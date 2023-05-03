"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Detail_expeditions", {
      dex_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pro_id: {
        type: Sequelize.INTEGER,
      },
      cou_id: {
        type: Sequelize.INTEGER,
      },
      exp_id: {
        type: Sequelize.INTEGER,
      },
      cou_id: {
        type: Sequelize.INTEGER,
      },
      dex_nbre: {
        type: Sequelize.INTEGER,
      },
      dex_comment: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addColumn("Detail_expeditions", "tai_id",{
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Detail_expeditions", {
      fields: ["exp_id"],
      type: "foreign key",
      name: "exp_id_fk_dex",
      references: {
        field: "exp_id",
        table: "Expeditions",
      },
    });

    await queryInterface.addConstraint("Detail_expeditions", {
      fields: ["pro_id"],
      type: "foreign key",
      name: "pro_id_fk_dex",
      references: {
        field: "pro_id",
        table: "Produits",
      },
    });

    await queryInterface.addConstraint("Detail_expeditions", {
      fields: ["tai_id"],
      type: "foreign key",
      name: "tai_id_fk_dex",
      references: {
        field: "tai_id",
        table: "Tailles",
      },
    });

    await queryInterface.addConstraint("Detail_expeditions", {
      fields: ["cou_id"],
      type: "foreign key",
      name: "cou_id_fk_dex",
      references: {
        field: "cou_id",
        table: "Couleurs",
      },
    });

    await queryInterface.addConstraint("Retours", {
      fields: ["dex_id"],
      type: "foreign key",
      name: "dex_id_fk_ret",
      references: {
        field: "dex_id",
        table: "Detail_expeditions",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Detail_expeditions");
  },
};
