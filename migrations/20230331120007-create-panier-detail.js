'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Panier_details', {
      pad_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      tar_id: {
        type: Sequelize.INTEGER
      },
      prm_id: {
        type: Sequelize.INTEGER
      },
      pan_id: {
        type: Sequelize.INTEGER
      },
      pad_qte: {
        type: Sequelize.INTEGER
      },
      pad_ht: {
        type: Sequelize.FLOAT
      },
      pad_remise: {
        type: Sequelize.FLOAT
      }
    });
    await queryInterface.addConstraint('Panier_details',{
      fields:["pan_id"],
      type:"foreign key",
      name:"pan_fk_pan_details",
      references:{
        table:"Paniers",
        field:"pan_id",
      }
    })
    await queryInterface.addConstraint('Panier_details',{
      fields:["pro_id"],
      type:"foreign key",
      name:"pro_fk_pan_details",
      references:{
        table:"Produits",
        field:"pro_id",
      }
    })
    await queryInterface.addConstraint('Panier_details',{
      fields:["prm_id"],
      type:"foreign key",
      name:"prm_id_fk_pan_details",
      references:{
        table:"Promos",
        field:"prm_id",
      }
    })
    await queryInterface.addConstraint('Panier_details',{
      fields:["tar_id"],
      type:"foreign key",
      name:"tar_id_fk_pan_details",
      references:{
        table:"Tarifs",
        field:"tar_id",
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Panier_details');
  }
};