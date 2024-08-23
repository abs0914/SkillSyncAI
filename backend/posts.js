const express = require('express');
const router = express.Router();

// Sample data for posts
let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
  { id: 2, title: 'Post 2', body: 'This is the second post.' },
  { id: 3, title: 'Post 3', body: 'This is the third post.' },
  // Add more posts as needed
];

// Route to get all posts
router.get('/posts', (req, res) => {
  res.json(posts);
});

module.exports = router;