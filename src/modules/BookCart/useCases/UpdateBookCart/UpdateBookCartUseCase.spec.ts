import { beforeEach, describe, it } from 'vitest';
import { UpdateBookCartUseCase } from './UpdateBookCartUseCase';
import { BooksCartRepositoryInMemory } from '../../repository/in-memory/BookCartRepositoryInMemory';
import { BooksRepositoryInMemory } from '#/modules/Book/repository/in-memory/BooksRepositoryInMemory';
import { CartRepositoryInMemory } from '#/modules/Cart/repository/in-memory/CartRepositoryInMemory';

const createSut = () => {
  const booksCartRepository = new BooksCartRepositoryInMemory(true);
  const booksRepository = new BooksRepositoryInMemory(true);
  const cartRepository = new CartRepositoryInMemory();

  const sut = new UpdateBookCartUseCase(booksCartRepository, booksRepository, cartRepository);

  return { sut };
};

let currentSut: UpdateBookCartUseCase;

describe('UpdateBookCartUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;
  });

  it.todo('should update a bookCart');
  it.todo("should throw an error if the selected book doesn't exists in the cart");
  it.todo("should throw an error if the selected book doesn't exists");
  it.todo("should throw an error if the cart doesn't exists");
  it.todo("should grows cart's total price if the current quantity is higher then before");
  it.todo("should low cart's total price if the current quantity is lower then before");
});
