import { BooksRepositoryInMemory } from '#/modules/Book/repository/in-memory/BooksRepositoryInMemory';
import { BooksCartRepositoryInMemory } from '#/modules/BookCart/repository/in-memory/BookCartRepositoryInMemory';
import { assert, beforeEach, describe, expect, it } from 'vitest';
import { CartRepositoryInMemory } from '../../repository/in-memory/CartRepositoryInMemory';
import { AddOrDeleteBookOfCartUseCase } from './AddOrDeleteBookOfCartUseCase';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const cartsRepository = new CartRepositoryInMemory(true);
  const booksRepository = new BooksRepositoryInMemory(true);
  const booksCartRepository = new BooksCartRepositoryInMemory(true);

  const sut = new AddOrDeleteBookOfCartUseCase(cartsRepository, booksRepository, booksCartRepository);

  return { sut, cartsRepository };
};

let currentSut: AddOrDeleteBookOfCartUseCase;

describe('AddOrDeleteBookOfCartUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;
  });

  it('should add a book to the cart', async () => {
    const newBookCart = await currentSut.execute({ bookId: 'bookId3', clientId: 'clientId1' });

    expect(newBookCart.BooksCart).toHaveLength(2);
  });

  it('should remove a book from the cart', async () => {
    const removeBookCart = await currentSut.execute({ bookId: 'bookId5', clientId: 'clientId1' }, true);

    expect(removeBookCart.BooksCart).toHaveLength(1);
  });

  it("should throw an error if the selected book doesn't exists", async () => {
    try {
      await currentSut.execute({ bookId: 'bookId2', clientId: 'clientId1' });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('O livro não existe ou foi deletado');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an error if the current cart doesn't exists", async () => {
    try {
      await currentSut.execute({ bookId: 'bookId3', clientId: 'clientId6' });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Nenhum carrinho foi encontrado');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should throw an error if the selected book it is not in the current cart', async () => {
    try {
      await currentSut.execute({ bookId: 'bookId3', clientId: 'clientId1' }, true);
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('O livro não existe neste carrinho');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should throw an error if the selected book it is already in the current cart', async () => {
    try {
      await currentSut.execute({ bookId: 'bookId1', clientId: 'clientId1' });
    } catch (error: any) {
      expect(error.message).toBe('Este livro ja foi adicionado ao carrinho');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
