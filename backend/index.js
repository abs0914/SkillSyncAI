const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
  { id: 2, title: 'Post 2', body: 'This is the second post.' },
];
app.get('/api/posts', (req, res) => {
    res.json(posts);
  });
  app.post('/api/posts', (req, res) => {
    const newPost = {
      id: posts.length + 1,
      title: req.body.title,
      body: req.body.body,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
  });
  app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);
  
    if (postIndex !== -1) {
      posts[postIndex] = {
        id: postId,
        title: req.body.title,
        body: req.body.body,
      };
      res.json(posts[postIndex]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
  app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.status(204).end();
  });