import { UsersRepositoryInMemory } from '#modules/User/repository/in-memory/UsersRepositoryInMemory.js';
import { assert, beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { AppError } from '#/http/middlewares/ErrorHandler';

const makeSut = () => {
  const usersRepositoryInMemory = new UsersRepositoryInMemory();

  const sut = new CreateUserUseCase(usersRepositoryInMemory);

  return { sut };
};

let currentSut: CreateUserUseCase;
let userMock: CreateUserDTO;

describe('Name of the group', () => {
  beforeEach(() => {
    userMock = { email: 'pedro@gmail.com', name: 'Pedro', password: '1234', phone: '5199999999' };
    currentSut = makeSut().sut;
  });

  it('should create an user', async () => {
    const user = await currentSut.execute(userMock);

    expect(user.name).toBe('Pedro');
  });

  it('should not create an user if it already exists', async () => {
    await currentSut.execute(userMock);

    try {
      await currentSut.execute(userMock);
      assert.fail('should not create an user');
    } catch (err: any) {
      expect(err.message).toEqual('Ja existe um usuário com este email!');
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
