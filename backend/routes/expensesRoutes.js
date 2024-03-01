const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const verifyToken = require('../middlewares/authMiddleware');

// Route to create a new expense, protected
router.post('/expenses', verifyToken, expensesController.createExpense);

// Route to get all expenses of the logged-in user, protected
router.get('/expenses', verifyToken, expensesController.getAllExpensesForUser);

// Route to get a single expense by ID, protected
router.get('/expenses/:id', verifyToken, expensesController.getExpenseByIdForUser);

// Route to update an expense, protected
router.put('/expenses/:id', verifyToken, expensesController.updateExpenseForUser);

// Route to delete an expense, protected
router.delete('/expenses/:id', verifyToken, expensesController.deleteExpenseForUser);

module.exports = router;
