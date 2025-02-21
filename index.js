// Load environment variables from a .env file
require('dotenv-flow').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger'); // Custom logging utility

// Initialize Express app
const app = express();

// Middleware configuration
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(helmet()); // Add security headers

// Disable the "X-Powered-By" header for security
app.disable('x-powered-by');

// Define routes
app.get('/', (req, res) => {
    logger.info('Root endpoint accessed');
    res.status(200).send('Welcome to Elixir Academy Backend');
});

app.get('/api/status', (req, res) => {
    logger.info('Status check endpoint hit');
    res.status(200).json({ message: 'Server is running' });
});

// Handle 404 errors
app.use((_req, res) => {
    logger.warn('404 - Route not found');
    res.status(404).json({ message: 'Route not found' });
});

// Get the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
    console.log(`🚀 Server running on http://localhost:${port}`);
});
