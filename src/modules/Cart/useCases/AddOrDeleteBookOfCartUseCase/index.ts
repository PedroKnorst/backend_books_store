import { BooksRepository } from '#/modules/Book/repository/prisma/BooksRepository';
import { CartRepository } from '../../repository/prisma/CartRepository';
import { AddOrDeleteBookOfCartUseCase } from './AddOrDeleteBookOfCartUseCase';

export const makeAddOrDeleteBookOfCartUseCase = () => {
  const booksRepository = new BooksRepository();
  const cartsRepository = new CartRepository();

  const useCase = new AddOrDeleteBookOfCartUseCase(cartsRepository, booksRepository);

  return useCase;
};
