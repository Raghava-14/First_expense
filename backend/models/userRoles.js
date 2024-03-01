'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      // define association here
    }
  };
  UserRoles.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // should match the table name for users
        key: 'id',
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles', // should match the table name for roles
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles', // ensure this matches the table name defined in the migration
  });

  return UserRoles;
};
