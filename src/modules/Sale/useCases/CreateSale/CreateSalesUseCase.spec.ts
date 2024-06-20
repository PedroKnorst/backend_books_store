import { BooksRepositoryInMemory } from '#/modules/Book/repository/in-memory/BooksRepositoryInMemory';
import { CartRepositoryInMemory } from '#/modules/Cart/repository/in-memory/CartRepositoryInMemory';
import { SalespersonRepositoryInMemory } from '#/modules/Salesperson/repository/in-memory/SalespersonRepositoryInMemory';
import { assert, beforeEach, describe, expect, it } from 'vitest';
import { SalesRepositoryInMemory } from '../../repository/in-memory/SalesRepositoryInMemory';
import { CreateSalesUseCase } from './CreateSalesUseCase';
import { AppError } from '#/http/middlewares/ErrorHandler';

const createSut = () => {
  const salesRepository = new SalesRepositoryInMemory();
  const cartsRepository = new CartRepositoryInMemory(true);
  const salespersonRepositoryInMemory = new SalespersonRepositoryInMemory(true);
  const booksRepository = new BooksRepositoryInMemory(true);

  const sut = new CreateSalesUseCase(salesRepository, cartsRepository, salespersonRepositoryInMemory, booksRepository);

  return { sut, salespersonRepositoryInMemory };
};

let currentSut: CreateSalesUseCase;
let salespersonRepository: SalespersonRepositoryInMemory;

describe('CreateSalesUseCase', () => {
  beforeEach(() => {
    const { salespersonRepositoryInMemory, sut } = createSut();
    salespersonRepository = salespersonRepositoryInMemory;
    currentSut = sut;
  });

  it('should create a sale', async () => {
    const sales = await currentSut.execute({ clientId: 'clientId1', paymentId: 'paymentId1' });

    expect(sales).toHaveLength(1);
  });

  it('should update the salesperson balance', async () => {
    const sales = await currentSut.execute({ clientId: 'clientId1', paymentId: 'paymentId1' });

    const salesperson = await salespersonRepository.findById(sales[0].salespersonId);

    expect(salesperson?.balance).toBe(40);
  });

  it("should throw an error if the current cart doesn't exists", async () => {
    try {
      await currentSut.execute({ clientId: 'clientId3', paymentId: 'paymentId1' });
      assert.fail('should not create a sale');
    } catch (error: any) {
      expect(error.message).toBe('O carrinho não existe');
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an error if the current salesperson doesn't exists", async () => {
    try {
      await currentSut.execute({ clientId: 'clientId5', paymentId: 'paymentId1' });
      assert.fail('should not create a sale');
    } catch (error: any) {
      expect(error.message).toBe('O vendedor não existe');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
