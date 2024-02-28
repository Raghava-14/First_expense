const { GroupMember, User, Group } = require('../models');

// Add a user to a group after invitation acceptance
exports.addMemberToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body; // Assuming the frontend sends the userId of the user who accepted the invitation
    const member = await GroupMember.create({
      groupId,
      userId
    });
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// List all members of a group
exports.listGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const members = await GroupMember.findAll({
      where: { groupId },
      include: [User] // Including user details
    });
    res.send(members);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Remove a member from a group
exports.removeMemberFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params; // Assuming you pass userId as a parameter
    await GroupMember.destroy({
      where: { groupId, userId }
    });
    res.send({ message: 'Member removed from the group successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
