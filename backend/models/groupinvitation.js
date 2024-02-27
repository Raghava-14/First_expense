'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupInvitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupInvitation.belongsTo(models.Group, { foreignKey: 'group_id', onDelete: 'CASCADE' });
      GroupInvitation.belongsTo(models.User, { foreignKey: 'invited_user_id', as: 'InvitedUser', onDelete: 'CASCADE' });
      GroupInvitation.belongsTo(models.User, { foreignKey: 'invited_by', as: 'InvitingUser', onDelete: 'CASCADE' });
    }
  }
  GroupInvitation.init({
    invitation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    group_id: DataTypes.INTEGER,
    invited_user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    invited_by: DataTypes.INTEGER,
    sent_at: DataTypes.DATE,
    responded_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GroupInvitation',
    tableName: 'group_invitations',
    timestamps: false
  });
  return GroupInvitation;
};