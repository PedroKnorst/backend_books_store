import { assert, beforeEach, describe, expect, it } from 'vitest';
import { BooksRepositoryInMemory } from '../../repository/in-memory/BooksRepositoryInMemory';
import { FindByIdUseCase } from './FindByIdUseCase';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const booksRepositoryInMemory = new BooksRepositoryInMemory(true);

  const sut = new FindByIdUseCase(booksRepositoryInMemory);

  return { sut };
};

let currentSut: FindByIdUseCase;

describe('FindByIdUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;
  });

  it('should find the book by its id', async () => {
    const book = await currentSut.execute('bookId1');

    return book;
  });

  it("should throw an error if the book doesn't exists", async () => {
    try {
      await currentSut.execute('bookId2');
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Livro não encontrado');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
