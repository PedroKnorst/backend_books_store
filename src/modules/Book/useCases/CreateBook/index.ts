import { SalespersonRepository } from '#/modules/Salesperson/repository/prisma/SalespersonRepository';
import { BooksRepository } from '../../repository/prisma/BooksRepository';
import { CreateBookUseCase } from './CreateBookUseCase';

export const makeCreateBookUseCase = () => {
  const booksRepository = new BooksRepository();

  const salespersonRepository = new SalespersonRepository();

  const useCase = new CreateBookUseCase(booksRepository, salespersonRepository);

  return useCase;
};
