'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coloris', {
      clrs_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      cou_id: {
        type: Sequelize.INTEGER
      },
      tai_id: {
        type: Sequelize.INTEGER
      },
      col_nbre: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Coloris',{
      fields:['pro_id'],
      type:"foreign key",
      name:"pro_id_in_colirs",
      references:{
        table:"Produits",
        field:"pro_id"
      }
    })
    await queryInterface.addConstraint('Coloris',{
      fields:['tai_id'],
      type:"foreign key",
      name:"tai_id_in_colirs",
      references:{
        table:"Tailles",
        field:"tai_id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Coloris');
  }
};