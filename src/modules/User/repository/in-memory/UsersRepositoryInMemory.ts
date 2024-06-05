import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUser, User } from '#modules/User/entities/User.js';
import { IUsersRepository } from '../types/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: IUser[] = [];

  constructor(seeds?: CreateUserDTO[]) {
    if (seeds) {
      seeds.forEach(seed => this.users.push(seed));
    }
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    const user = new User(data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const userAlreadyExists = this.users.find(user => user.email === email) ?? null;

    return userAlreadyExists;
  }
}
