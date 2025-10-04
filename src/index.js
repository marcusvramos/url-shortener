const express = require('express');
const { insertUrl, getUrl, incrementClicks, getAllUrls, getStats, deleteUrl } = require('./database');
const { generateShortCode, isValidUrl } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'URL Shortener API',
    version: '1.0.0',
    endpoints: {
      'POST /shorten': 'Create a short URL',
      'GET /:code': 'Redirect to original URL',
      'GET /api/urls': 'List all URLs',
      'GET /api/stats': 'Get statistics',
      'DELETE /api/urls/:code': 'Delete a short URL'
    }
  });
});

// Create short URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    const shortCode = generateShortCode();
    insertUrl.run(shortCode, url);

    res.json({
      success: true,
      shortCode,
      shortUrl: `http://localhost:${PORT}/${shortCode}`,
      originalUrl: url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
});

// Redirect to original URL
app.get('/:code', (req, res) => {
  const { code } = req.params;

  try {
    const url = getUrl.get(code);

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    incrementClicks.run(code);
    res.redirect(url.original_url);
  } catch (error) {
    res.status(500).json({ error: 'Failed to redirect' });
  }
});

// Get all URLs
app.get('/api/urls', (req, res) => {
  try {
    const urls = getAllUrls.all();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URLs' });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats.get();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Delete URL
app.delete('/api/urls/:code', (req, res) => {
  const { code } = req.params;

  try {
    const url = getUrl.get(code);

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    deleteUrl.run(code);
    res.json({
      success: true,
      message: 'URL deleted successfully',
      deletedCode: code
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete URL' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 URL Shortener API running on http://localhost:${PORT}`);
});
