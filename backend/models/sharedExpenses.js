'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      SharedExpense.belongsTo(models.Expense, { foreignKey: 'expense_id', onDelete: 'CASCADE' });
      SharedExpense.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
  }
  SharedExpense.init({
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'expenses',
        key: 'id',
      }
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },

    share_type: {
      type: DataTypes.ENUM('equal', 'amount', 'percentage', 'shares'),
      allowNull: false
    },
    
    share_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SharedExpense',
    tableName: 'shared_expenses', // Ensure lowercase and pluralized
    timestamps: true 
  });
  return SharedExpense;
};