import { assert, beforeEach, describe, expect, it } from 'vitest';
import { BooksRepositoryInMemory } from '../../repository/in-memory/BooksRepositoryInMemory';
import { CreateBookUseCase } from './CreateBookUseCase';
import { SalespersonRepositoryInMemory } from '#/modules/Salesperson/repository/in-memory/SalespersonRepositoryInMemory';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const booksRepositoryInMemory = new BooksRepositoryInMemory();
  const salespersonRepositoryInMemory = new SalespersonRepositoryInMemory(true);

  const sut = new CreateBookUseCase(booksRepositoryInMemory, salespersonRepositoryInMemory);

  return { sut };
};

let currentSut: CreateBookUseCase;
let bookMock: CreateBookDTO;

describe('CreateBookUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;

    bookMock = {
      author: 'Stan Lee',
      category: 'ACTION',
      character: 'Capitão América',
      description: 'Capitão América descrição',
      price: 20,
      salespersonId: 'salespersonId1',
      storage: 5,
      title: 'Capitão América Guerra Civil',
    };
  });

  it('should create a book', async () => {
    const book = await currentSut.execute(bookMock, { path: 'imagePath' });

    expect(book.title).toBe('Capitão América Guerra Civil');
  });

  it("should throw an error if the salesperson of the book doesn't exists", async () => {
    try {
      await currentSut.execute({ ...bookMock, salespersonId: 'anyid' }, { path: 'imagePath' });
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Este vendedor não existe no sistema!');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
