# 🔗 URL Shortener API

A simple, fast, and efficient URL shortener API built with Node.js, Express, and SQLite.

## ✨ Features

- 🚀 **Fast & Lightweight** - Built with Express and SQLite
- 📊 **Analytics** - Track clicks on your shortened URLs
- 🔒 **Validation** - URL format validation
- 💾 **Persistent Storage** - SQLite database
- 🎯 **Simple API** - RESTful endpoints

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/marcusvramos/url-shortener.git
cd url-shortener

# Install dependencies
npm install

# Start the server
npm start
```

## 🚀 Usage

### Start the server

```bash
npm start
```

The API will be available at `http://localhost:3000`

### API Endpoints

#### 1. Create Short URL

```http
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "success": true,
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "originalUrl": "https://example.com/very-long-url"
}
```

#### 2. Redirect to Original URL

```http
GET /:code
```

Redirects to the original URL and increments the click counter.

#### 3. List All URLs

```http
GET /api/urls
```

**Response:**
```json
[
  {
    "id": 1,
    "short_code": "abc123",
    "original_url": "https://example.com",
    "clicks": 5,
    "created_at": "2024-01-01 12:00:00"
  }
]
```

#### 4. Get Statistics

```http
GET /api/stats
```

**Response:**
```json
{
  "total_urls": 10,
  "total_clicks": 150
}
```

## 📝 Examples

### Using cURL

```bash
# Create a short URL
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'

# Get all URLs
curl http://localhost:3000/api/urls

# Get statistics
curl http://localhost:3000/api/stats
```

### Using JavaScript (fetch)

```javascript
// Create short URL
const response = await fetch('http://localhost:3000/shorten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://github.com' })
});

const data = await response.json();
console.log(data.shortUrl);
```

## 🗄️ Database Schema

```sql
CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** (better-sqlite3) - Database
- **nanoid** - Short code generation

## 📦 Project Structure

```
url-shortener/
├── src/
│   ├── index.js      # Main server file
│   ├── database.js   # Database setup and queries
│   └── utils.js      # Helper functions
├── package.json
├── .gitignore
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for learning or production!

---

Made with ❤️ by [Marcus Ramos](https://github.com/marcusvramos)
