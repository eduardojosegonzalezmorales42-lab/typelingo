import fs from 'fs/promises';
import path from 'path';

export class FileService {
  private static readonly filePath = path.join(process.cwd(), 'road-to-serfdom.txt');

  /**
   * Extracts the text content from the local txt file.
   * @returns Promise<string> The content of the file.
   */
  static async readTxtContent(): Promise<string> {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error reading the file:', error);
      throw new Error('Could not read the text file.');
    }
  }
}
