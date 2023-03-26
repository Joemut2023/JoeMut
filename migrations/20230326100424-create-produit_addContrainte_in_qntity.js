'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produits', {
      pro_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cat_id: {
        type: Sequelize.INTEGER
      },
      pro_ref: {
        type: Sequelize.STRING
      },
      pro_libelle: {
        type: Sequelize.STRING
      },
      pro_description: {
        type: Sequelize.STRING
      },
      pro_details: {
        type: Sequelize.STRING
      },
      pro_new_collect: {
        type: Sequelize.BOOLEAN
      },
      pro_en_avant: {
        type: Sequelize.BOOLEAN
      },
      pro_comment: {
        type: Sequelize.STRING
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
    await queryInterface.addConstraint("Produits",{
      fields:["cat_id"],
      type:"foreign key",
      name:"cat_id_in_produit",
      references:{
        table:"Categories",
        field:"cat_id"
      }
    })
    await queryInterface.addConstraint('Quantites',{
       fields:["pro_id"],
       type:"foreign key",
       name:"pro_id_in_quantite",
       references:{
        table:"Produits",
        field:"pro_id"
       }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produits');
  }
};