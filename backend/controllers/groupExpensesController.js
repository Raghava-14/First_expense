const { GroupExpense, Expense, Group } = require('../models');

// Create a new group expense
exports.createGroupExpense = async (req, res) => {
  try {
    const { groupId, expenseId } = req.body; // Assuming you receive an existing expenseId and the groupId to which it belongs
    const groupExpense = await GroupExpense.create({
      groupId,
      expenseId
    });
    res.status(201).send(groupExpense);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// List all expenses for a specific group
exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await GroupExpense.findAll({
      where: { groupId },
      include: [Expense] // Including expense details
    });
    res.send(expenses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a group expense (if needed, though this might be less common)
exports.updateGroupExpense = async (req, res) => {
  try {
    const { groupExpenseId } = req.params;
    const { expenseId } = req.body; // Assuming changes might involve linking the expense to a different expense record
    const updated = await GroupExpense.update({ expenseId }, {
      where: { id: groupExpenseId }
    });
    if (updated) {
      res.send({ message: 'Group expense updated successfully' });
    } else {
      res.status(404).send({ message: 'Group expense not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a group expense
exports.deleteGroupExpense = async (req, res) => {
  try {
    const { groupExpenseId } = req.params;
    await GroupExpense.destroy({
      where: { id: groupExpenseId }
    });
    res.send({ message: 'Group expense deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
