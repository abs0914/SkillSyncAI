const express = require('express');
const cors = require('cors'); // Import the CORS package

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import your routes
const authRoutes = require('./auth');
const postsRoutes = require('./posts');

// Use the authentication and posts routes
app.use('/api', authRoutes);
app.use('/api', postsRoutes);

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
