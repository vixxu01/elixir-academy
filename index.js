// Load environment variables from a .env file
require('dotenv-flow').config();

// Import the Express.js framework to create a web server
const express = require('express');
const app = express();

// Import middleware for security and logging
const cors = require('cors'); // Allows cross-origin requests
const helmet = require('helmet'); // Adds security headers
const logger = require('./utils/logger'); // Custom logging utility

// Configure Express to parse JSON and URL-encoded data
app.use(express.json()); // Automatically parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different domains
app.use(cors());

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Disable the "X-Powered-By" header to prevent disclosing server technology
app.disable('x-powered-by');

// Define a test route
app.get('/api/status', (req, res) => {
    logger.info('Status check endpoint hit');
    res.status(200).json({ message: 'Server is running' });
});

// Catch-all route for unhandled requests
app.use((_req, res) => {
    return res.status(404).json({ message: 'Route not found' });
});

// Get the port number from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    logger.info(`App Listening on port ${port}`);
    console.log(`Server running on http://localhost:${port}`);
});
