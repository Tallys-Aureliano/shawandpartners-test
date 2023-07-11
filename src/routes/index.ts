import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response, Router} from "express";
import multer from "multer";
import readline from "readline";
import { Readable } from "stream";

const multerConfig = multer();
const router = Router();

interface User{
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

router.post("/users", multerConfig.single("file"), 
async (request: Request, response: Response)=> { 
    const { file } = request;
    const buffer = file?.buffer;
    
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null); 
    const usersLine = readline.createInterface({
        input: readableFile,
    });
    const usersArray: User[] = [];
    for await (let line of usersLine) {
        const usersLineSplit = line.split(";");   
        usersArray.push({
            name: usersLineSplit[0],
            city: usersLineSplit[1],
            country: usersLineSplit[2],
            favorite_sport: usersLineSplit[3] 
        });
    }
    for await (let {name, city, country, favorite_sport} of usersArray){
        await prisma.user.create({
            data: {
                name,
                city,
                country,
                favorite_sport
            },
        });
    }
    return response.send();
});

export {router};