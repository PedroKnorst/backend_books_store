import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUser } from '#modules/User/entities/User.js';
import { IUsersRepository } from '#modules/User/repository/types/IUsersRepository.js';
import { hash } from 'bcrypt';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: CreateUserDTO): Promise<IUser> {
    const hashedPassword = await hash(data.password, 8);

    const updatedUserData = {
      ...data,
      password: hashedPassword
    }

    const user = await this.usersRepository.create(updatedUserData);

    return user;
  }
}
