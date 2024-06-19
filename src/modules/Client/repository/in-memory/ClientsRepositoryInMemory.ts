import { CreateClientDTO } from '../../dtos/CreateClientDTO';
import { Client } from '../../entities/Client';
import { IClientsRepository } from '../@types';

export class ClientsRepositoryInMemory implements IClientsRepository {
  clients: Client[] = [];

  async create(data: CreateClientDTO): Promise<Client> {
    const client = new Client({ ...data, paymentId: 'paymentId1' });

    this.clients.push(client);

    return client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.clients.find(currentClient => currentClient.id === id);
    return client || null;
  }

  async updateClient(data: { id: string; paymentId: string }): Promise<Client> {
    const clientIndex = this.clients.findIndex(currentClient => currentClient.id === data.id);

    let client = this.clients[clientIndex];

    client.paymentId = data.paymentId;

    const replaceCart = this.clients.filter(currentClient => currentClient.id !== client.id);

    replaceCart.push(client);

    this.clients = replaceCart;

    return client;
  }
}
