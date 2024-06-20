import { UsersRepositoryInMemory } from '#modules/User/repository/in-memory/UsersRepositoryInMemory.js';
import { assert, beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { SalespersonRepositoryInMemory } from '#/modules/Salesperson/repository/in-memory/SalespersonRepositoryInMemory';
import { ClientsRepositoryInMemory } from '#/modules/Client/repository/in-memory/ClientsRepositoryInMemory';
import { CartRepositoryInMemory } from '#/modules/Cart/repository/in-memory/CartRepositoryInMemory';
import { PaymentsRepositoryInMemory } from '#/modules/Payment/repository/in-memory/PaymentRepositoryInMemory';

const makeSut = () => {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const salespersonRepository = new SalespersonRepositoryInMemory();
  const clientsRepository = new ClientsRepositoryInMemory();
  const cartsRepository = new CartRepositoryInMemory();
  const paymentsRepository = new PaymentsRepositoryInMemory(true);

  const sut = new CreateUserUseCase(
    usersRepositoryInMemory,
    salespersonRepository,
    clientsRepository,
    cartsRepository,
    paymentsRepository
  );

  return { sut };
};

let currentSut: CreateUserUseCase;
let userMock: CreateUserDTO;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userMock = {
      email: 'pedro@gmail.com',
      name: 'Pedro vendedor',
      password: '1234',
      phone: '5199999999',
      profile: 'SALESPERSON',
    };
    currentSut = makeSut().sut;
  });

  it('should create an user as salesperson', async () => {
    const { user } = await currentSut.execute(userMock);

    expect(user.name).toBe('Pedro vendedor');
  });

  it('should create a user as client', async () => {
    const { user } = await currentSut.execute({ ...userMock, profile: 'CLIENT', name: 'Pedro Cliente' }, 'clientId1');

    expect(user.name).toBe('Pedro Cliente');
  });

  it('should not create an user if it already exists', async () => {
    await currentSut.execute(userMock);

    try {
      await currentSut.execute(userMock);
      assert.fail('should not create an user');
    } catch (error: any) {
      expect(error.message).toEqual('Ja existe um usuário com este email');
      expect(error).toBeInstanceOf(AppError);
    }
  });
  it("should throw an error if the client doesn't have a payment type", async () => {
    
    try {
      await currentSut.execute({ ...userMock, profile: 'CLIENT', name: 'Pedro Cliente' }, 'clientId2');
      assert.fail('should not create an user');
    } catch (error: any) {
      expect(error.message).toEqual('Forma de pagamento não encontrada');
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
