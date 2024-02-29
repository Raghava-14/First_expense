'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, { foreignKey: 'user_id' });
      Expense.belongsTo(models.Category, { foreignKey: 'category_id' });
    }
  }
  Expense.init({
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: DataTypes.STRING,
    time_and_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // Note: Use the table name defined in Sequelize model
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Note: Use the table name defined in Sequelize model
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses', // Ensure lowercase and pluralized
    timestamps: false // Disabling automatic timestamps
  });
  return Expense;
};