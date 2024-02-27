'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_expenses', {
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      expense_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'expenses',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      // Removed createdAt and updatedAt fields
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('group_expenses');
  }
};