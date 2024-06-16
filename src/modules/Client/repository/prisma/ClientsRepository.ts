import prisma from '#/database/PrismaClient';
import { Client } from '@prisma/client';
import { IClientsRepository } from '../@types';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

export class ClientsRepository implements IClientsRepository {
  async create(data: CreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data: { userId: data.userId, Payment: { create: {} }, cartId: data.cartId },
      include: { Payment: true },
    });

    return client;
  }

  async updateClient(data: { id: string; paymentId: string }): Promise<Client> {
    const client = await prisma.client.update({
      data: { Payment: { connect: { id: data.paymentId } } },
      where: { id: data.id },
      include: { Payment: true, Cart: { include: { BooksCart: true } } },
    });

    return client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({ where: { id } });

    return client;
  }
}
