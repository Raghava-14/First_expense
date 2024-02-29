const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// Route to create a new user
router.post('/users', userController.createUser);

// Route to fetch all users
router.get('/users', userController.getAllUsers);

// Route to fetch a single user by ID
router.get('/users/:id', userController.getUserById);

// Route to update a user's details
router.put('/users/:id', userController.updateUser);

// Route to delete a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
