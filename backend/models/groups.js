'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations can be defined here
      Group.hasMany(models.GroupExpense, { foreignKey: 'group_id' });
      Group.belongsToMany(models.User, {
        through: 'GroupMember',
        foreignKey: 'group_id',
        otherKey: 'user_id'
      });
    }
  };
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups', // Ensure lowercase and pluralized
    timestamps: true // Disabling automatic timestamps
  });
  return Group;
};