import { PaymentsRepository } from '#/modules/Payment/repository/prisma/PaymentsRepository';
import { ClientsRepository } from '../repository/prisma/ClientsRepository';
import { CreateClientUseCase } from './CreateClientUseCase';

export const makeCreateClientUseCase = () => {
  const clientsRepository = new ClientsRepository();
  const paymentsRepository = new PaymentsRepository();

  const useCase = new CreateClientUseCase(clientsRepository, paymentsRepository);

  return useCase;
};
