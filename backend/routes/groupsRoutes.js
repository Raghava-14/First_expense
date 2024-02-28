const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groupsController');

// Route to create a new group
router.post('/groups', groupsController.createGroup);

// Route to get all groups
router.get('/groups', groupsController.getAllGroups);

// Route to get a single group by ID
router.get('/groups/:id', groupsController.getGroupById);

// Route to update a group
router.put('/groups/:id', groupsController.updateGroup);

// Route to delete a group
router.delete('/groups/:id', groupsController.deleteGroup);

module.exports = router;
