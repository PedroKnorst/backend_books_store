import { BooksRepository } from '#/modules/Book/repository/prisma/BooksRepository';
import { CartRepository } from '#/modules/Cart/repository/prisma/CartRepository';
import { BookCartRepository } from '../../repository/prisma/BookCartRepository';
import { UpdateBookCartUseCase } from './UpdateBookCartUseCase';

export const makeUpdateBookCartUseCase = () => {
  const booksCartRepository = new BookCartRepository();
  const booksRepository = new BooksRepository();
  const cartRepository = new CartRepository();

  const useCase = new UpdateBookCartUseCase(booksCartRepository, booksRepository, cartRepository);

  return useCase;
};
