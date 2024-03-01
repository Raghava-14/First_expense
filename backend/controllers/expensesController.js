const { Expense, Category } = require('../models');

// Fetch all expenses for the logged-in user
exports.getAllExpensesForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const expenses = await Expense.findAll({
      where: { userId: userId }, // Filter expenses by the logged-in user's ID
      include: [Category]
    });
    res.send(expenses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single expense by ID for the logged-in user
exports.getExpenseByIdForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: userId }, // Ensure the expense belongs to the logged-in user
      include: [Category]
    });
    if (expense) {
      res.send(expense);
    } else {
      res.status(404).send({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new expense for the logged-in user
exports.createExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const newExpense = await Expense.create({ ...req.body, userId: userId }); // Add the user ID to the expense
    res.status(201).send(newExpense);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an expense for the logged-in user
exports.updateExpenseForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const updatedExpense = await Expense.update(req.body, {
      where: { id: req.params.id, userId: userId }, // Ensure the expense belongs to the logged-in user
      returning: true,
    });
    if (updatedExpense[0]) {
      res.send(updatedExpense[1][0]);
    } else {
      res.status(404).send({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete an expense for the logged-in user
exports.deleteExpenseForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const deleted = await Expense.destroy({
      where: { id: req.params.id, userId: userId }, // Ensure the expense belongs to the logged-in user
    });
    if (deleted) {
      res.send({ message: 'Expense deleted' });
    } else {
      res.status(404).send({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
