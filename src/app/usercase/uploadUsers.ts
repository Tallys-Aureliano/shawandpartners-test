import { PrismaClient } from "@prisma/client";
import { userDto } from "../dtos/usersDtos";
const prisma = new PrismaClient();

export class UploadUsersUseCase{
  async execute(user: userDto) {
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          city: user.city,
          country: user.country,
          favorite_sport: user.favorite_sport,
        },
      });
      return newUser
    }
}