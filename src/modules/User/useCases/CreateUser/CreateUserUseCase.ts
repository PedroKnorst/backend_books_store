import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '#modules/User/repository/types/IUsersRepository.js';
import { hash } from 'bcrypt';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { createUserSchema } from '../../validator/createUser';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: CreateUserDTO): Promise<Omit<IUser, 'password'>> {
    validateSchema(data, createUserSchema);

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
    if (userAlreadyExists) throw new AppError('Ja existe um usuário com este email!');

    const hashedPassword = await hash(data.password, 8);

    const updatedUserData = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(updatedUserData);

    

    return { name: user.name, email: user.email, phone: user.phone };
  }
}
