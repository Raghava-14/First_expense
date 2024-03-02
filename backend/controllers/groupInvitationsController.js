const { GroupInvitation, User, Group } = require('../models');

// Send a new invitation to join a group
exports.sendInvitation = async (req, res) => {
  try {
    const { group_id, invited_user_id } = req.body;
    const invitation = await GroupInvitation.create({
      group_id,
      invited_user_id,
      status: 'pending', // Initial status is always 'pending'
      invited_by: req.userId // Assuming the userId is available in request, e.g., from a middleware
    });
    res.status(201).send(invitation);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const { invitation_id } = req.params;
    const updatedInvitation = await GroupInvitation.update(
      { status: 'accepted' },
      { where: { id: invitation_id, invited_user_id: req.userId, status: 'pending' }, returning: true } // Ensuring that only the invited user can accept
    );

    console.log('Updated Invitation:', updatedInvitation);

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
    const { invitation_id } = req.params;
    const updatedInvitation = await GroupInvitation.update(
      { status: 'declined' },
      { where: { id: invitation_id, invited_user_id: req.userId, status: 'pending' }, returning: true } // Ensuring that only the invited user can decline
    );

    console.log('Updated Invitation:', updatedInvitation);

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
      where: { invited_user_id: req.userId },
      include: [{ model: Group }, { model: User, as: 'invited_by' }] // Including group and who invited the user
    });
    res.send(invitations);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
