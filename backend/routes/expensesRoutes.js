const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

// Route to create a new expense
router.post('/expenses', expensesController.createExpense);

// Route to get all expenses
router.get('/expenses', expensesController.getAllExpenses);

// Route to get a single expense by ID
router.get('/expenses/:id', expensesController.getExpenseById);

// Route to update an expense
router.put('/expenses/:id', expensesController.updateExpense);

// Route to delete an expense
router.delete('/expenses/:id', expensesController.deleteExpense);

// Route to Undelete an expense
router.put('/expenses/:id/undelete', expensesController.undeleteExpense);


module.exports = router;
