import { Request, Response } from 'express';
import { uploadUsersUseCase } from '../usercase/createUsers';
import { Readable } from 'stream';
import readline from 'readline';
import { userDto } from '../dtos/usersDtos';

export class UploadUserController {
    async handle(req: Request, res: Response) {
        try {
            const { file } = req;

            if (!file) {
                return res.status(400).json({ error: 'No file provided' });
            }

            const buffer = file.buffer;

            const readableFile = new Readable();
            readableFile.push(buffer);
            readableFile.push(null);

            const usersLine = readline.createInterface({
                input: readableFile,
            });

            const usersArray: userDto[] = [];

            for await (const line of usersLine) {
                const usersLineSplit = line.split(';');

                const [name, city, country, favorite_sport] = usersLineSplit;

                const user: userDto = {
                    name,
                    city,
                    country,
                    favorite_sport,
                };

                await uploadUsersUseCase(user);

                usersArray.push(user);
            }

            return res.json(usersArray);
        } catch (error) {
            console.error('Error creating users:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}