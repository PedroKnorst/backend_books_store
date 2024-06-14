import { BooksRepository } from '../../repository/prisma/BooksRepository';
import { FindByIdUseCase } from './FindByIdUseCase';

export const makeFindByIdUseCase = () => {
  const booksRepository = new BooksRepository();

  const useCase = new FindByIdUseCase(booksRepository);

  return useCase;
};
