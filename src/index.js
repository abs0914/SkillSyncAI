import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

const users = [];

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);