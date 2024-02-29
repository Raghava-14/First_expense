'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations can be defined here
      User.hasMany(models.Group, { foreignKey: 'created_by' });
      User.hasMany(models.Expense, { foreignKey: 'user_id' });
      User.hasMany(models.SharedExpense, { foreignKey: 'user_id' });
      User.hasMany(models.GroupInvitation, { as: 'InvitationsSent', foreignKey: 'invited_by' });
      User.hasMany(models.GroupInvitation, { as: 'InvitationsReceived', foreignKey: 'invited_user_id' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};