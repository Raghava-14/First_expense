const express = require('express');
const router = express.Router();
const groupExpensesController = require('../controllers/groupExpensesController');

// Route to create a new group expense
router.post('/group-expenses', groupExpensesController.createGroupExpense);

// Route to get all group expenses for a specific group
router.get('/group-expenses/:groupId', groupExpensesController.getGroupExpenses);

// Route to update a group expense
router.put('/group-expenses/:id', groupExpensesController.updateGroupExpense);

// Route to delete a group expense
router.delete('/group-expenses/:id', groupExpensesController.deleteGroupExpense);

module.exports = router;
