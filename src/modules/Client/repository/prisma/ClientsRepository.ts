import prisma from '#/database/PrismaClient';
import { Client } from '@prisma/client';
import { IClientsRepository } from '../@types';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

export class ClientsRepository implements IClientsRepository {
  async create(data: CreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data: { userId: data.userId, Cart: { create: {} } },
    });

    return client;
  }

  async updateClient(data: { paymentId: string; id: string }): Promise<Client> {
    const client = await prisma.client.update({
      data: { Payments: { connect: { id: data.paymentId } } },
      where: { id: data.id },
    });

    return client;
  }
}
