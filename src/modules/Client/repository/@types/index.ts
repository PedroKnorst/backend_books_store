import { Client } from '@prisma/client';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

export interface IClientsRepository {
  create(data: CreateClientDTO): Promise<Client>;
  updateClient(data: { paymentId: string; id: string }): Promise<Client>;
}
