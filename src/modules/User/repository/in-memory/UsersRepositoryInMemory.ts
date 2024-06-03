import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUser, User } from '#modules/User/entities/User.js';
import { IUsersRepository } from '../types/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: IUser[] = [];

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = new User(data);

    this.users.push(user);

    return user;
  }
}
