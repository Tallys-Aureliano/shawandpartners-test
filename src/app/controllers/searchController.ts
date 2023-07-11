import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SearchController {
    async handle(req: Request, res:Response) {
        try {
            const { value } = req.params;
                if (!value) {
                const listUser = await prisma.user.findMany({
                  select: {
                    name: true,
                    city: true,
                    country: true,
                    favorite_sport: true
                  },
                }); 
                return res.status(210).json(listUser); 
              } else {
                const search = await prisma.user.findMany({
                  where: {
                    OR: [
                      { name: value},
                      { city: value },
                      { country: value },
                      { favorite_sport: value },
                    ],
                  },
                  select: {
                    name: true,
                    city: true,
                    country: true,
                    favorite_sport: true,
                  },
                });
                console.log(search);
                return res.json(search);
              }
            }
            catch (error) {
            console.log(error);
        }
    }
}