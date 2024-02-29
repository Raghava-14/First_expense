'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Group, { foreignKey: 'created_by' });
      User.hasMany(models.Expense, { foreignKey: 'user_id' });
      User.hasMany(models.SharedExpense, { foreignKey: 'user_id' });
      User.hasMany(models.GroupInvitation, { as: 'InvitationsSent', foreignKey: 'invited_by' });
      User.hasMany(models.GroupInvitation, { as: 'InvitationsReceived', foreignKey: 'invited_user_id' });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  return User;
};
