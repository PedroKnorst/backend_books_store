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

    // validação se usuario existe e se carrinho existe

    const client = await this.clientsRepository.create({ cartId: data.cartId, userId: data.userId });

    await this.paymentsRepository.create({ clientId: client.id });

    // await this.clientsRepository.updateClient({ paymentId: payment.id, id: client.id });

    return client;
  }
}
