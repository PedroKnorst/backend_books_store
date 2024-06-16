import { Client } from '@prisma/client';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

export interface IClientsRepository {
  create(data: CreateClientDTO): Promise<Client>;
  updateClient(data: { id: string; paymentId: string }): Promise<Client>;
  findById(id: string): Promise<Client | null>;
}
