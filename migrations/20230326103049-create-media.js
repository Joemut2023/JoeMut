'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medias', {
      med_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pro_id: {
        type: Sequelize.INTEGER
      },
      tym_id: {
        type: Sequelize.INTEGER
      },
      med_libelle: {
        type: Sequelize.STRING
      },
      med_ressource: {
        type: Sequelize.STRING
      }, 
      mimetype:{
        type: Sequelize.STRING
      }
    });
    await queryInterface.addConstraint("Medias",{
      fields:["pro_id"],
      type:"foreign key",
      name:"pro_id_in_media",
      references:{
        table:"Produits",
        field:"pro_id"
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medias');
  }
};