import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '../types/IUsersRepository';
import prisma from '#database/PrismaClient';
import { IUser } from '#modules/User/entities/User.js';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';
import { Prisma } from '@prisma/client';

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

  async update(data: UpdateUserDTO): Promise<IUser> {
    let dataPrisma: Prisma.UserUncheckedUpdateInput = {};

    if (data.clientId) {
      dataPrisma = { clientId: data.clientId };
    }

    if (data.salespersonId) {
      dataPrisma = { salespersonId: data.salespersonId };
    }

    if (data.name) {
      dataPrisma = { ...dataPrisma, name: data.name };
    }

    const user = await prisma.user.update({
      where: { id: data.id },
      data: dataPrisma,
    });

    //melhorar update

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findFirst({ where: { id } });

    return user;
  }
}
