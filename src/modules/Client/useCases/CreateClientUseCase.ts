import { IPaymentsRepository } from '#/modules/Payment/repository/@types/IPaymentsRepository';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { IClientsRepository } from '../repository/@types';

export class CreateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute(data: CreateClientDTO) {
    // validação zod

    const client = await this.clientsRepository.create({ userId: data.userId });

    await this.paymentsRepository.create({ clientId: client.id });

    return client;
  }
}
