// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create an Express Router
const router = express.Router();

// In-memory storage for users (for demo purposes)
const users = [];

// Route to handle user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  // Respond with a success message
  res.status(201).json({ message: 'User registered successfully' });
});

// Route to handle user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

module.exports = router;
