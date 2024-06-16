import { ICartRepository } from '#/modules/Cart/repository/@types/ICartRepository';
import { IPaymentsRepository } from '#/modules/Payment/repository/@types/IPaymentsRepository';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { IClientsRepository } from '../repository/@types';

export class CreateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    private cartsRepository: ICartRepository,
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute(data: Omit<CreateClientDTO, 'cartId'>) {
    // validação zod

    const cart = await this.cartsRepository.create();

    const client = await this.clientsRepository.create({ userId: data.userId, cartId: cart.id });

    await this.cartsRepository.update({ clientId: client.id, id: cart.id });

    const payment = await this.paymentsRepository.create({ clientId: client.id });

    const udpatedClient = await this.clientsRepository.updateClient({ id: client.id, paymentId: payment.id });

    return udpatedClient;
  }
}
