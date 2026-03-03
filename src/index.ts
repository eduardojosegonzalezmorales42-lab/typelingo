import express, { Request, Response } from 'express';
import { FileService } from './services/fileService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  try {
    const text = await FileService.readTxtContent();
    res.json({ content: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract text from file.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
