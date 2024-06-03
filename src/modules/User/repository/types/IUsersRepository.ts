import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUser } from '#modules/User/entities/User.js';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
