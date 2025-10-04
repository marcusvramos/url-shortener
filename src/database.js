const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'urls.db'));

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Prepare statements for better performance
const insertUrl = db.prepare(`
  INSERT INTO urls (short_code, original_url)
  VALUES (?, ?)
`);

const getUrl = db.prepare(`
  SELECT * FROM urls WHERE short_code = ?
`);

const incrementClicks = db.prepare(`
  UPDATE urls SET clicks = clicks + 1
  WHERE short_code = ?
`);

const getAllUrls = db.prepare(`
  SELECT * FROM urls ORDER BY created_at DESC
`);

const getStats = db.prepare(`
  SELECT
    COUNT(*) as total_urls,
    SUM(clicks) as total_clicks
  FROM urls
`);

module.exports = {
  db,
  insertUrl,
  getUrl,
  incrementClicks,
  getAllUrls,
  getStats
};
