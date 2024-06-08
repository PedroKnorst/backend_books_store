import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO';
import { IUser } from '#modules/User/entities/User';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(data: UpdateUserDTO): Promise<IUser>;
}
