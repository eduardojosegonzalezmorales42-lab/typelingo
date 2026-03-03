import express, { Request, Response } from 'express';
import { FileService } from './services/fileService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeLingo Express API!' });
});

app.get('/text', async (req: Request, res: Response) => {
  try {
    const text = await FileService.readTxtContent();
    res.json({ content: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract text from file.' });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
