import { BooksRepository } from '../../repository/prisma/BooksRepository';
import { UpdateBookUseCase } from './UpdateBookUseCase';

export const makeUpdateBookUseCase = () => {
  const booksRepository = new BooksRepository();

  const useCase = new UpdateBookUseCase(booksRepository);

  return useCase;
};
