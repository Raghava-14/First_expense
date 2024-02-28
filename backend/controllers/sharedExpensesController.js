const { SharedExpense, Expense, User } = require('../models');

// Create a new shared expense
exports.createSharedExpense = async (req, res) => {
  try {
    const { expenseId, userId, shareType, shareValue } = req.body;
    const sharedExpense = await SharedExpense.create({
      expenseId,
      userId,
      shareType,
      shareValue
    });
    res.status(201).send(sharedExpense);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// List shared expenses for a specific expense
exports.listSharedExpenses = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const sharedExpenses = await SharedExpense.findAll({
      where: { expenseId },
      include: [User] // Include user details for each shared expense
    });
    res.send(sharedExpenses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a shared expense
exports.updateSharedExpense = async (req, res) => {
  try {
    const { sharedExpenseId } = req.params;
    const { shareType, shareValue } = req.body;
    const updated = await SharedExpense.update({ shareType, shareValue }, {
      where: { id: sharedExpenseId }
    });
    if (updated) {
      res.send({ message: 'Shared expense updated successfully' });
    } else {
      res.status(404).send({ message: 'Shared expense not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a shared expense
exports.deleteSharedExpense = async (req, res) => {
  try {
    const { sharedExpenseId } = req.params;
    await SharedExpense.destroy({
      where: { id: sharedExpenseId }
    });
    res.send({ message: 'Shared expense deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};