import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '../types/IUsersRepository';
import prisma from '#database/PrismaClient';
import { IUser } from '#modules/User/entities/User.js';

export class UsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}
