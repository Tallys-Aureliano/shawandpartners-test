import { PrismaClient } from '@prisma/client';
import e, { Request, Response, Router } from 'express';
import multer from 'multer';
import readline from 'readline';
import { Readable } from 'stream';

const prisma = new PrismaClient();
const multerConfig = multer();
const router = Router();

interface User {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

router.post('/users', multerConfig.single('file'), async (request: Request, response: Response) => {
  try {
    const { file } = request;

    if (!file) {
      return response.status(400).json({ error: 'No file provided' });
    }

    const buffer = file.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const usersLine = readline.createInterface({
      input: readableFile,
    });

    const usersArray: User[] = [];

    for await (const line of usersLine) {
      const usersLineSplit = line.split(';');

      const [name, city, country, favorite_sport] = usersLineSplit;

      await prisma.user.create({
        data:{
            name,
            city,
            country,
            favorite_sport,
        }
      });
    }
    return response.json(usersArray);
  } catch (error) {
    console.error('Error creating users:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

export { router };