import { ClientsRepository } from '#/modules/Client/repository/prisma/ClientsRepository';
import { CartRepository } from '../../repository/prisma/CartRepository';
import { GetCartUseCase } from './GetCartUseCase';

export const makeGetCartUseCase = () => {
  const cartsRepository = new CartRepository();

  const clientsRepository = new ClientsRepository();

  const useCase = new GetCartUseCase(cartsRepository, clientsRepository);
  
  return useCase;
};
