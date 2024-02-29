const express = require('express');
const router = express.Router();
const groupInvitationsController = require('../controllers/groupInvitationsController');

// Sending a new invitation
router.post('/send', groupInvitationsController.sendInvitation);

// Accepting an invitation
router.put('/accept/:invitationId', groupInvitationsController.acceptInvitation);

// Declining an invitation
router.put('/decline/:invitationId', groupInvitationsController.declineInvitation);

// Listing all invitations for a user
router.get('/', groupInvitationsController.listInvitations);

module.exports = router;