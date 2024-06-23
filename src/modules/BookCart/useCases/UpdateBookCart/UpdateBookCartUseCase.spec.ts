import { assert, beforeEach, describe, expect, it } from 'vitest';
import { UpdateBookCartUseCase } from './UpdateBookCartUseCase';
import { BooksCartRepositoryInMemory } from '../../repository/in-memory/BookCartRepositoryInMemory';
import { BooksRepositoryInMemory } from '#/modules/Book/repository/in-memory/BooksRepositoryInMemory';
import { CartRepositoryInMemory } from '#/modules/Cart/repository/in-memory/CartRepositoryInMemory';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const booksCartRepository = new BooksCartRepositoryInMemory(true);
  const booksRepository = new BooksRepositoryInMemory(true);
  const cartRepository = new CartRepositoryInMemory(true);

  const sut = new UpdateBookCartUseCase(booksCartRepository, booksRepository, cartRepository);

  return { sut, booksCartRepository };
};

let currentSut: UpdateBookCartUseCase;

describe('UpdateBookCartUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;
  });

  it('should update a bookCart', async () => {
    const bookCart = await currentSut.execute({ clientId: 'clientId1', id: 'bookCartId1', quantity: 3 });

    expect(bookCart.quantity).toBe(3);
  });

  it("should throw an error if the selected book doesn't exists in the cart", async () => {
    try {
      await currentSut.execute({ clientId: 'clientId1', id: 'bookCartId4', quantity: 2 });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Este livro não esta no carrinho');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an error if the selected book doesn't exists", async () => {
    try {
      await currentSut.execute({ clientId: 'clientId1', id: 'bookCartId2', quantity: 2 });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Este livro não existe');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an error if the cart doesn't exists", async () => {
    try {
      await currentSut.execute({ clientId: 'clientId7', id: 'bookCartId1', quantity: 2 });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Erro ao encontrar carrinho do cliente');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should grows cart's total price if the current quantity is higher then before", async () => {
    const booksCartRepository = createSut().booksCartRepository;

    let bookCart = await booksCartRepository.findById('bookCartId1');

    expect(bookCart?.totalPrice).toBe(40);

    bookCart = await currentSut.execute({ clientId: 'clientId1', id: 'bookCartId1', quantity: 3 });

    expect(bookCart.totalPrice).toBe(60);
    expect(bookCart.Cart?.totalPrice).toBe(60);
  });

  it("should low cart's total price if the current quantity is lower then before", async () => {
    const booksCartRepository = createSut().booksCartRepository;

    let bookCart = await booksCartRepository.findById('bookCartId1');

    expect(bookCart?.totalPrice).toBe(40);

    bookCart = await currentSut.execute({ clientId: 'clientId1', id: 'bookCartId1', quantity: 1 });

    expect(bookCart.totalPrice).toBe(20);
    expect(bookCart.Cart?.totalPrice).toBe(20);
  });
});
