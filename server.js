const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
// Note: This is a demo application. In production, consider adding rate limiting.
app.use(express.static('public'));

// API endpoint example
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    message: 'Server is up and running!',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});
