const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, title: 'Post 1', body: 'This is the first post.' },
    { id: 2, title: 'Post 2', body: 'This is the second post.' },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});