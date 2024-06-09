import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '#modules/User/repository/types/IUsersRepository.js';
import { hash } from 'bcrypt';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { createUserSchema } from '../../validator/createUser';
import { makeCreateClientUseCase } from '#/modules/Client/useCases';
import { makeCreateSalespersonUseCase } from '#/modules/Salesperson/useCases/CreateSalespersonUseCase';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: CreateUserDTO): Promise<Omit<IUser, 'password' | 'id'>> {
    validateSchema(data, createUserSchema);

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
    if (userAlreadyExists) throw new AppError('Ja existe um usuário com este email!');

    const hashedPassword = await hash(data.password, 8);

    const updatedUserData = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(updatedUserData);

    if (data.profile === 'CLIENT') {
      const client = await makeCreateClientUseCase().execute({ userId: user.id });
      await this.usersRepository.update({ clientId: client.id, id: user.id });
    } else if (data.profile === 'SALESPERSON') {
      const salesperson = await makeCreateSalespersonUseCase().execute({ userId: user.id });
      await this.usersRepository.update({ salespersonId: salesperson.id, id: user.id });
    }

    return { name: user.name, email: user.email, phone: user.phone };
  }
}
