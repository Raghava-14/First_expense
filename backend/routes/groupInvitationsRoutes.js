const express = require('express');
const router = express.Router();
const groupInvitationsController = require('../controllers/groupInvitationsController');

// Route to send a new invitation
router.post('/group-invitations', groupInvitationsController.sendInvitation);

// Route to get all invitations for a group
router.get('/group-invitations/:groupId', groupInvitationsController.getAllInvitationsForGroup);

// Route to accept an invitation
router.put('/group-invitations/:invitationId/accept', groupInvitationsController.acceptInvitation);

// Route to decline an invitation
router.put('/group-invitations/:invitationId/decline', groupInvitationsController.declineInvitation);

module.exports = router;
