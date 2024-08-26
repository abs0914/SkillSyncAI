const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');

let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
  { id: 2, title: 'Post 2', body: 'This is the second post.' },
  { id: 3, title: 'Post 3', body: 'This is the third post.' },
];

// Protect the /api/posts route
router.get('/posts', authMiddleware, (req, res) => {
  res.json(posts);
});

module.exports = router;
