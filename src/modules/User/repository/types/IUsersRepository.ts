import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO';
import { IUser } from '#modules/User/entities/User';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
