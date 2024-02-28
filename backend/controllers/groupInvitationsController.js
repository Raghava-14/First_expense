const { GroupInvitation, User, Group } = require('../models');

// Send a new invitation to join a group
exports.sendInvitation = async (req, res) => {
  try {
    const { groupId, invitedUserId } = req.body;
    const invitation = await GroupInvitation.create({
      groupId,
      invitedUserId,
      status: 'pending', // Initial status is always 'pending'
      invitedBy: req.userId // Assuming the userId is available in request, e.g., from a middleware
    });
    res.status(201).send(invitation);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const updatedInvitation = await GroupInvitation.update(
      { status: 'accepted' },
      { where: { id: invitationId, invitedUserId: req.userId }, returning: true } // Ensuring that only the invited user can accept
    );
    if (updatedInvitation[0]) {
      res.send(updatedInvitation[1][0]);
    } else {
      res.status(404).send({ message: 'Invitation not found or already responded' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Decline an invitation
exports.declineInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const updatedInvitation = await GroupInvitation.update(
      { status: 'declined' },
      { where: { id: invitationId, invitedUserId: req.userId }, returning: true } // Ensuring that only the invited user can decline
    );
    if (updatedInvitation[0]) {
      res.send(updatedInvitation[1][0]);
    } else {
      res.status(404).send({ message: 'Invitation not found or already responded' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Optional: List all invitations for a user
exports.listInvitations = async (req, res) => {
  try {
    const invitations = await GroupInvitation.findAll({
      where: { invitedUserId: req.userId },
      include: [{ model: Group }, { model: User, as: 'invitedBy' }] // Including group and who invited the user
    });
    res.send(invitations);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
