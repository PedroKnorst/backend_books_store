import { assert, beforeEach, describe, expect, it } from 'vitest';
import { UpdateBookDTO } from '../../dtos/UpdateBookDTO';
import { BooksRepositoryInMemory } from '../../repository/in-memory/BooksRepositoryInMemory';
import { UpdateBookUseCase } from './UpdateBookUseCase';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const booksRepositoryInMemory = new BooksRepositoryInMemory(true);

  const sut = new UpdateBookUseCase(booksRepositoryInMemory);

  return { sut, booksRepositoryInMemory };
};

let currentSut: UpdateBookUseCase;
let bookMock: UpdateBookDTO;

describe('CreateBookUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;

    bookMock = {
      id: 'bookId1',
    };
  });

  it('should udpate the title of book', async () => {
    const findBookById = await createSut().booksRepositoryInMemory.findByid('bookId1');

    expect(findBookById?.title).toBe('Homem de Ferro 1');

    const udaptedBook = await currentSut.execute({ ...bookMock, title: 'Homem de Ferro 2' });

    expect(udaptedBook.title).toBe('Homem de Ferro 2');
  });

  it("should throw an error if the book doesn't exists", async () => {
    try {
      await currentSut.execute({ id: 'bookId2' });
        assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Este livro não existe');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
