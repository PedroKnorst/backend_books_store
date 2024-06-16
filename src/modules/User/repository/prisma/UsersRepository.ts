import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '../types/IUsersRepository';
import prisma from '#database/PrismaClient';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';
import { Prisma, User } from '@prisma/client';

export class UsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
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

  async update(data: UpdateUserDTO): Promise<User> {
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
      include: { Client: { include: { Payment: true } }, Salesperson: true },
    });

    //melhorar update

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email }, include: { Client: true, Salesperson: true } });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id }, include: { Client: true, Salesperson: true } });

    return user;
  }
}
