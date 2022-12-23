/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'email', Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'email');
  },
};
