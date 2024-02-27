'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations can be defined here
      GroupMember.belongsTo(models.User, { foreignKey: 'user_id' });
      GroupMember.belongsTo(models.Group, { foreignKey: 'group_id' });
    }
  };
  GroupMember.init({
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups', // Note lowercase, matching table name
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Note lowercase, matching table name
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'GroupMember',
    tableName: 'group_members', // Ensure lowercase and pluralized
    timestamps: false, // Disabling automatic timestamps
    indexes: [
      {
        unique: true,
        fields: ['group_id', 'user_id']
      }
    ]
  });
  return GroupMember;
};