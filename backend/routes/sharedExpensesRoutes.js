const express = require('express');
const router = express.Router();
const sharedExpensesController = require('../controllers/sharedExpensesController');

// Route to create a new shared expense
router.post('/shared-expenses', sharedExpensesController.createSharedExpense);

// Route to get all shared expenses for a user
router.get('/shared-expenses/user/:userId', sharedExpensesController.getSharedExpensesForUser);

// Route to get all shared expenses for a group
router.get('/shared-expenses/group/:groupId', sharedExpensesController.getSharedExpensesForGroup);

// Route to update a shared expense
router.put('/shared-expenses/:id', sharedExpensesController.updateSharedExpense);

// Route to delete a shared expense
router.delete('/shared-expenses/:id', sharedExpensesController.deleteSharedExpense);

module.exports = router;
