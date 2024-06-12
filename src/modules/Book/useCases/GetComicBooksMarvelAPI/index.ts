import { BooksRepository } from '../../repository/prisma/BooksRepository';
import { GetComicBooksMarvelAPIUseCase } from './GetComicBooksMarvelAPIUseCase';

export const makeGetComicBooksMarvelAPIUseCase = () => {
  const booksRepository = new BooksRepository();

  const useCase = new GetComicBooksMarvelAPIUseCase(booksRepository);

  return useCase;
};
