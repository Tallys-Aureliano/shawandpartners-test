import { Request, Response } from 'express';
import { UploadUsersUseCase } from '../usercase/uploadUsers';
import { Readable } from 'stream';
import readline from 'readline';
import { userDto } from '../dtos/usersDtos';
import { StatusCodes } from "http-status-codes";

export class UploadUserController {
    async handle(req: Request, res: Response) {
        try {
            const { file } = req;
            if (!file) {
                console.log(file);
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'No file provided' });
            }
            const buffer = file.buffer;
            const readableFile = new Readable();
            readableFile.push(buffer);
            readableFile.push(null);

            const usersLine = readline.createInterface({
                input: readableFile,
            });

            const usersArray: userDto[] = [];
            const create = new UploadUsersUseCase();
            for await (const line of usersLine) {
                const usersLineSplit = line.split(';');
                const [name, city, country, favorite_sport] = usersLineSplit;
                const user: userDto = {
                    name,
                    city,
                    country,
                    favorite_sport,
                };
                await create.execute(user);
                usersArray.push(user);
            }
            return res.status(StatusCodes.CREATED).json(usersArray);

        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "The server cannot find the requested resource" });
        }
    }
}