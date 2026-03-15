const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all origins and methods
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Trust proxy if we're behind one
app.set('trust proxy', 1);

app.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'road-to-serfdom.txt');
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to split by sentence endings (., !, ?) followed by whitespace or end of string
    const sentences = content
      .split(/(?<=[.!?])\s+/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 0);

    res.json({
      title: "The Road to Serfdom",
      sentenceCount: sentences.length,
      sentences: sentences
    });
  } catch (error) {
    console.error('Error reading or processing file:', error);
    res.status(500).json({ error: 'Failed to process text file' });
  }
});

app.get('/german', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'road-to-serfdom-german.txt');
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to split by sentence endings (., !, ?) followed by whitespace or end of string
    const sentences = content
      .split(/(?<=[.!?])\s+/)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(s => s.length > 0);

    res.json({
      title: "Der Weg zur Knechtschaft",
      sentenceCount: sentences.length,
      sentences: sentences
    });
  } catch (error) {
    console.error('Error reading or processing file:', error);
    res.status(500).json({ error: 'Failed to process German text file' });
  }
});

// Explicitly listen on all interfaces (0.0.0.0)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
