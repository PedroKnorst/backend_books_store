import { UsersRepository } from '../../repository/prisma/UsersRepository';
import { AuthUserUseCase } from './AuthUserUseCase';

export const makeAuthUserUseCase = () => {
  const usersRepository = new UsersRepository();

  const useCase = new AuthUserUseCase(usersRepository);

  return useCase;
};
