'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shared_expenses', { // Use lowercase
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      share_type: {
        type: Sequelize.STRING
      },
      share_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
      // Removed createdAt and updatedAt fields
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shared_expenses');
  }
};
