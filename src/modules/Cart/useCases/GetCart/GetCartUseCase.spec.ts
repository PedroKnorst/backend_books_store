import { assert, beforeEach, describe, expect, it } from 'vitest';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { CartRepositoryInMemory } from '../../repository/in-memory/CartRepositoryInMemory';
import { GetCartUseCase } from './GetCartUseCase';
import { ClientsRepositoryInMemory } from '#/modules/Client/repository/in-memory/ClientsRepositoryInMemory';

const createSut = () => {
  const cartsRepository = new CartRepositoryInMemory(true);
  const clientsRepository = new ClientsRepositoryInMemory(true);

  const sut = new GetCartUseCase(cartsRepository, clientsRepository);

  return { sut };
};

let currentSut: GetCartUseCase;

describe('GetCartUseCase', () => {
  beforeEach(() => {
    currentSut = createSut().sut;
  });

  it('should get the cart by its clientId', async () => {
    const book = await currentSut.execute('clientId8');

    return book;
  });

  it("should throw an error if the client doesn't exists", async () => {
    try {
      await currentSut.execute('clientId2');
      assert.fail('test should fail');
    } catch (error: any) {
      expect(error.message).toBe('Cliente não encontrado');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
