const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const roleMiddleware = require('./roleMiddleware');

let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
  { id: 2, title: 'Post 2', body: 'This is the second post.' },
  { id: 3, title: 'Post 3', body: 'This is the third post.' },
];

// Only admin can create posts
router.post('/posts', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: posts.length + 1, title, body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// All authenticated users can view posts
router.get('/posts', authMiddleware, (req, res) => {
  res.json(posts);
});

module.exports = router;
