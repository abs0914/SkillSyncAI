require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variables
const PORT = process.env.PORT || 5000;

const authRoutes = require('./auth');
const postsRoutes = require('./posts');

app.use('/api', authRoutes);
app.use('/api', postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
