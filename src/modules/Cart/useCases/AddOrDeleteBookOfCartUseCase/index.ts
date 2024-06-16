import { BooksRepository } from '#/modules/Book/repository/prisma/BooksRepository';
import { BookCartRepository } from '#/modules/BookCart/repository/prisma/BookCartRepository';
import { CartRepository } from '../../repository/prisma/CartRepository';
import { AddOrDeleteBookOfCartUseCase } from './AddOrDeleteBookOfCartUseCase';

export const makeAddOrDeleteBookOfCartUseCase = () => {
  const booksRepository = new BooksRepository();
  const cartsRepository = new CartRepository();
  const bookCartRepository = new BookCartRepository();

  const useCase = new AddOrDeleteBookOfCartUseCase(cartsRepository, booksRepository, bookCartRepository);

  return useCase;
};
