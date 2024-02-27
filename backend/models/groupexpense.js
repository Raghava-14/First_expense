'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      GroupExpense.belongsTo(models.Group, { foreignKey: 'group_id' });
      GroupExpense.belongsTo(models.Expense, { foreignKey: 'expense_id' });
    }
  }
  GroupExpense.init({
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups', // Note lowercase, matching table name
        key: 'id',
      },
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'expenses', // Note lowercase, matching table name
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'GroupExpense',
    tableName: 'group_expenses', // Ensure lowercase and pluralized
    timestamps: false, // Disabling automatic timestamps
  });
  return GroupExpense;
};