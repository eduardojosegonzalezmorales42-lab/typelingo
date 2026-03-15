const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'road-to-serfdom.txt');
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to split by sentence endings (., !, ?) followed by whitespace or end of string
    // This handles common punctuation and keeps the content relatively clean
    const sentences = content
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
