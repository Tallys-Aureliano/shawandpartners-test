import { PrismaClient } from "@prisma/client";
import { userDto } from "../dtos/usersDtos";
const prisma = new PrismaClient();

export async function uploadUsersUseCase(user: userDto) {
    await prisma.user.create({
      data: {
        name: user.name,
        city: user.city,
        country: user.country,
        favorite_sport: user.favorite_sport,
      },
    });
  }