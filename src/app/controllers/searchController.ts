import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SearchController {
    async handle(req: Request, res:Response) {
        try {
            const q: string = req.query.q as string;
            console.log(q)
                if (!q) {
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
                      { name: q},
                      { city: q },
                      { country: q },
                      { favorite_sport: q },
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