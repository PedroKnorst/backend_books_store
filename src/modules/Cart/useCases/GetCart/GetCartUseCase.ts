import { AppError } from '#/http/middlewares/ErrorHandler';
import { IClientsRepository } from '#/modules/Client/repository/@types';
import { ICartRepository } from '../../repository/@types/ICartRepository';

export class GetCartUseCase {
  constructor(
    private cartsRepository: ICartRepository,
    private clientsRepository: IClientsRepository
  ) {}

  async execute(clientId: string) {
    const clientExists = await this.clientsRepository.findById(clientId);

    if (!clientExists) throw new AppError('Cliente não encontrado');

    const cart = await this.cartsRepository.findCartByClient(clientId);

    return cart;
  }
}
