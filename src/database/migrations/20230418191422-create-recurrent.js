/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('recurrents', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      initial_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      initial_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      final_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      final_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('recurrents');
  },
};
