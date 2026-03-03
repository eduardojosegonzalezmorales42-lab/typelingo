import fs from 'fs/promises';
import path from 'path';

export interface ParagraphMap {
  [key: number]: string;
}

export class FileService {
  private static readonly filePath = path.join(process.cwd(), 'road-to-serfdom.txt');

  /**
   * Extracts the text content from the local txt file and splits it into numbered paragraphs.
   * @returns Promise<ParagraphMap> A map of paragraph indices to their text content.
   */
  static async getNumberedParagraphs(): Promise<ParagraphMap> {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      
      // Split by one or more blank lines and filter out empty strings
      const paragraphs = content
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const paragraphMap: ParagraphMap = {};
      paragraphs.forEach((text, index) => {
        paragraphMap[index + 1] = text;
      });

      return paragraphMap;
    } catch (error) {
      console.error('Error reading the file:', error);
      throw new Error('Could not read the text file.');
    }
  }
}
