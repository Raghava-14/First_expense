const { Category } = require('../models');

// Fetch all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedCategory[0]) {
      res.send(updatedCategory[1][0]);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: 'Category deleted' });
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
