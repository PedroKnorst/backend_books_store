import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO';
import { User } from '#modules/User/entities/User';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(data: UpdateUserDTO): Promise<User>;
}
