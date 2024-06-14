import { BooksRepository } from '../../repository/prisma/BooksRepository';
import { GetBooksWithFilterUseCase } from './GetBooksWithFilterUseCase';

export const makeGetBooksWithFilterUseCase = () => {
  const booksRepository = new BooksRepository();

  const useCase = new GetBooksWithFilterUseCase(booksRepository);

  return useCase;
};
