import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { User } from '#modules/User/entities/User.js';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';
import { IUsersRepository } from '../types/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  constructor(seeds?: CreateUserDTO[]) {
    if (seeds) {
      seeds.forEach(seed => {
        const user = new User(seed);
        this.users.push(user);
      });
    }
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = new User(data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userAlreadyExists = this.users.find(user => user.email === email) ?? null;

    return userAlreadyExists;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(currentUser => currentUser.id === id);

    return user || null;
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const userIndex = this.users.findIndex(currentUser => currentUser.id === data.id);

    let user = this.users[userIndex];

    const { clientId, name, salespersonId } = data;

    if (clientId) {
      user.clientId = clientId;
    }

    if (name) {
      user.name = name;
    }

    if (salespersonId) {
      user.salespersonId;
    }

    return user;
  }
}
