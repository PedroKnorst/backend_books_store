import { CartRepository } from '#/modules/Cart/repository/prisma/CartRepository';
import { ClientsRepository } from '#/modules/Client/repository/prisma/ClientsRepository';
import { PaymentsRepository } from '#/modules/Payment/repository/prisma/PaymentsRepository';
import { SalespersonRepository } from '#/modules/Salesperson/repository/prisma/SalespersonRepository';
import { UsersRepository } from '#modules/User/repository/prisma/UsersRepository.js';
import { CreateUserUseCase } from './CreateUserUseCase';

export const makeCreateUserUseCase = () => {
  const usersRepository = new UsersRepository();
  const clientsRepository = new ClientsRepository();
  const salespersonRepository = new SalespersonRepository();
  const cartsRepository = new CartRepository();
  const paymentsRepository = new PaymentsRepository();

  const useCase = new CreateUserUseCase(
    usersRepository,
    salespersonRepository,
    clientsRepository,
    cartsRepository,
    paymentsRepository
  );

  return useCase;
};
