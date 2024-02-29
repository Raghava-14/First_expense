const { User } = require('../models');
// Removed bcrypt since we won't be using it for now
const jwt = require('jsonwebtoken');

// Environment variables for JWT
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

exports.signup = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    // Directly storing plaintext password without hashing
    const newUser = await User.create({ username, email, password, name });
    res.status(201).send({ message: "User created successfully", userId: newUser.id, name: newUser.name });
  } catch (error) {
    console.log(error); // Logging the error
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Direct comparison of plaintext passwords
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) return res.status(401).send({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
