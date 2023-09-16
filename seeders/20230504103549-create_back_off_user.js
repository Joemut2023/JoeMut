'use strict';

const { PROFIL_ADMIN } = require('../helpers/utils_const');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
   await queryInterface.bulkInsert('Users',[{
      prf_id:PROFIL_ADMIN,
      usr_nom:'Kabasi',
      usr_prenom:'Romain',
      usr_mail:'kabasiromain@gmail.com',
      usr_pwd:'$2a$10$I7RbpGLBrMKE0/OJSw9I0eAPxjj9zXmMl6h8Fq/CR1wQZtzTXIx36'
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
