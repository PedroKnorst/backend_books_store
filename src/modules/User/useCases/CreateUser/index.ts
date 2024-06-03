import { UsersRepository } from '#modules/User/repository/prisma/UsersRepository.js';
import { CreateUserUseCase } from './CreateUserUseCase';

export const makeCreateUserUseCase = () => {
  const usersRepository = new UsersRepository();

  const useCase = new CreateUserUseCase(usersRepository);

  return useCase;
};
