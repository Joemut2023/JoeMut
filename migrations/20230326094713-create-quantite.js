'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quantites', {
      qua_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tai_id: {
        type: Sequelize.INTEGER
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      qua_nbre: {
        type: Sequelize.INTEGER
      }
    });

    await queryInterface.addConstraint('Quantites',{
      fields:['tai_id'],
      type:'foreign key',
      name:'tai_id_in_quantites',
      references:{
        table:"Tailles",
        field:"tai_id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quantites');
  }
};