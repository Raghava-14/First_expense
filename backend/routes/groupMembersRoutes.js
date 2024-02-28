const express = require('express');
const router = express.Router();
const groupMembersController = require('../controllers/groupMembersController');

// Route to add a user to a group
router.post('/group-members', groupMembersController.addUserToGroup);

// Route to list all members of a group
router.get('/group-members/:groupId', groupMembersController.getAllMembersForGroup);

// Route to remove a user from a group
router.delete('/group-members/:groupId/:userId', groupMembersController.removeUserFromGroup);

module.exports = router;
