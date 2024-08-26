const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const rateLimit = require('express-rate-limit');

const compression = require('compression');
app.use(compression());

// Apply to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Import your routes
const authRoutes = require('./auth');
const postsRoutes = require('./posts');

// Use the authentication and posts routes
app.use('/api', authRoutes);
app.use('/api', postsRoutes);

// Use environment variables for the port
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
