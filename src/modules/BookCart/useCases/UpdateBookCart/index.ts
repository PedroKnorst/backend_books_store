import { BooksRepository } from '#/modules/Book/repository/prisma/BooksRepository';
import { BookCartRepository } from '../../repository/prisma/BookCartRepository';
import { UpdateBookCartUseCase } from './UpdateBookCartUseCase';

export const makeUpdateBookCartUseCase = () => {
  const booksCartRepository = new BookCartRepository();
  const booksRepository = new BooksRepository();

  const useCase = new UpdateBookCartUseCase(booksCartRepository, booksRepository);

  return useCase;
};
