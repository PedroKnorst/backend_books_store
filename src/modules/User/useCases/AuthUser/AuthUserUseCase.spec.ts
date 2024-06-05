import { assert, beforeEach, describe, expect, it } from 'vitest';
import { UsersRepositoryInMemory } from '../../repository/in-memory/UsersRepositoryInMemory';
import { AuthUserUseCase } from './AuthUserUseCase';
import { IAuthUser } from '../../dtos/AuthUserDTO';
import { hash } from 'bcrypt';
import { AppError } from '#/http/middlewares/ErrorHandler';

const makeSut = async () => {
  const usersRepositoryInMemory = new UsersRepositoryInMemory([
    {
      name: 'Marvel',
      email: 'marvel@gmail.com',
      password: await hash('12345', 8),
    },
  ]);

  const sut = new AuthUserUseCase(usersRepositoryInMemory);

  return { sut };
};

describe('Name of the group', () => {
  it('should authenticate the user and make login', async () => {
    const sut = (await makeSut()).sut;

    const response = await sut.execute({ email: 'marvel@gmail.com', password: '12345' });

    expect(response.token).toBeTruthy();
  });

  it("should throw an error if the user doesn't exists", async () => {
    const sut = (await makeSut()).sut;
    try {
      await sut.execute({ email: 'any@gmail.com', password: '12345' });
      assert.fail('test should fail');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('Email e/ou senha incorreto(s)!');
    }
  });
  it('should throw an error if the password is incorrect', async () => {
    const sut = (await makeSut()).sut;
    try {
      await sut.execute({ email: 'marvel@gmail.com', password: '123456' });
      assert.fail('test should fail');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('Email e/ou senha incorreto(s)!');
    }
  });
});
