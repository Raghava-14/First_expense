const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriesController');

// Route to create a new category
router.post('/categories', categoryController.createCategory);

// Route to fetch all categories
router.get('/categories', categoryController.getAllCategories);

// Route to fetch a single category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Route to update a category's details
router.put('/categories/:id', categoryController.updateCategory);

// Route to delete a category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
