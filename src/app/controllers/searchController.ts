import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export class SearchController {
  async handle(req: Request, res: Response) {
    try {
      const q: string = req.query.q as string;
      if (!q) {
        const listUser = await getUsers();
        return res.status(StatusCodes.OK).json(listUser);
      }
      else {
        const search = await searchUsers(q);
        if (!search.length) {
          return res.status(StatusCodes.BAD_REQUEST).json({ error: "Error. There is no registered information" });
        } else {
          return res.status(StatusCodes.OK).json(search);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.NOT_FOUND).json({ error: "The server cannot find the requested resource" });
    }
  }
}

async function getUsers() {

  const listUser = await prisma.user.findMany({
    select: {
      name: true,
      city: true,
      country: true,
      favorite_sport: true
    },
  });
  return listUser;
}

async function searchUsers(q: string) {

  const search = await prisma.user.findMany({
    where: {
      OR: [
        { name: q },
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
  return search;
}