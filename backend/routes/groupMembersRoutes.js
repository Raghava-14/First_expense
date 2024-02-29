const express = require('express');
const router = express.Router();
const groupMembersController = require('../controllers/groupMembersController');

// Route to add a user to a group
router.post('/group-members', groupMembersController.addMemberToGroup);

// Route to list all members of a group
router.get('/group-members/:groupId', groupMembersController.listGroupMembers);

// Route to remove a user from a group
router.delete('/group-members/:groupId/:userId', groupMembersController.removeMemberFromGroup);

module.exports = router;
