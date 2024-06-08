import { UsersRepository } from '#/modules/User/repository/prisma/UsersRepository';
import { SalespersonRepository } from '../../repository/prisma/SalespersonRepository';
import { CreateSalespersonUseCase } from './CreateSalespersonUseCase';

export const makeCreateSalespersonUseCase = () => {
  const salespersonRepository = new SalespersonRepository();
  const usersRepository = new UsersRepository();

  const useCase = new CreateSalespersonUseCase(salespersonRepository, usersRepository);

  return useCase;
};
