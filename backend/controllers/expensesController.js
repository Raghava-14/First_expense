const { Expense, Category } = require('../models');

// Fetch all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [Category]
    });
    res.send(expenses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id, {
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

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).send(newExpense);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.update(req.body, {
      where: { id: req.params.id },
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

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    // The update method returns an array where the first element is the number of affected rows
    const [affectedRows] = await Expense.update({ isDeleted: true }, { where: { id } });
    
    if (affectedRows > 0) {
      res.send({ message: 'Expense soft-deleted successfully' });
    } else {
      // If no rows were affected, it means the expense was not found
      res.status(404).send({ message: 'Expense not found' });
    }
  } catch (error) {
    console.error("Error while deleting expense:", error);
    res.status(500).send({ message: error.message });
  }
}


//Undelete an expense
exports.undeleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.update(
      { isDeleted: false },
      { where: { id }, returning: true }
    );
    if (expense[0]) {
      res.send({ message: "Expense restored successfully", expense: expense[1][0] });
    } else {
      res.status(404).send({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


