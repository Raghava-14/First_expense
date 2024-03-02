const express = require('express');
const router = express.Router();
const groupInvitationsController = require('../controllers/groupInvitationsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// Sending a new invitation
router.post('/group-invitations', groupInvitationsController.sendInvitation);

// Accepting an invitation
router.put('/accept/:invitation_id', groupInvitationsController.acceptInvitation);

// Declining an invitation
router.put('/decline/:invitation_id', groupInvitationsController.declineInvitation);

// Listing all invitations for a user
router.get('/', groupInvitationsController.listInvitations);

module.exports = router;