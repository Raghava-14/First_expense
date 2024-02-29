const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware');

// Protected routes
// Route to update a user's details
router.put('/users/:id', verifyToken, userController.updateUser);

// Route to delete a user
router.delete('/users/:id', verifyToken, userController.deleteUser);

// Unprotected routes
// Route to create a new user
router.post('/users', userController.createUser);

// Route to fetch all users
router.get('/users', userController.getAllUsers);

// Route to fetch a single user by ID
router.get('/users/:id', userController.getUserById);

module.exports = router;  
