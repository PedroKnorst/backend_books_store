import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '../types/IUsersRepository';
import prisma from '#database/PrismaClient';
import { IUser } from '#modules/User/entities/User.js';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';

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
    const user = await prisma.user.update({
      where: { id: data.id },
      data: { Client: { connect: { id: data.clientId } }, Salesperson: { connect: { id: data.salespersonId } } },
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
