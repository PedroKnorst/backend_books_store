import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '#modules/User/repository/types/IUsersRepository.js';
import { hash } from 'bcrypt';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { createUserSchema } from '../../validator/createUser';
import { makeCreateClientUseCase } from '#/modules/Client/useCases';
import { makeCreateSalespersonUseCase } from '#/modules/Salesperson/useCases/CreateSalesperson';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv-safe';

config();

const SECRET = process.env.SECRET || '12345';

interface ICreateUserResponse {
  user: Omit<IUser, 'password' | 'id'>;
  token: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<ICreateUserResponse> {
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

      const updatedUser = await this.usersRepository.update({ clientId: client.id, id: user.id });

      const token = jwt.sign(
        {
          id: updatedUser.id,
          clientId: updatedUser.clientId,
          salespersonId: updatedUser.salespersonId,
          Client: updatedUser.Client,
          Salesperson: updatedUser.Salesperson,
        },
        SECRET
      );

      return {
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          salespersonId: updatedUser.salespersonId,
          clientId: updatedUser.clientId,
          Client: updatedUser.Client,
          Salesperson: updatedUser.Salesperson,
        },
        token,
      };
    }

    const salesperson = await makeCreateSalespersonUseCase().execute({ userId: user.id });

    const updatedUser = await this.usersRepository.update({ salespersonId: salesperson.id, id: user.id });

    const token = jwt.sign(
      {
        id: updatedUser.id,
        clientId: updatedUser.clientId,
        salespersonId: updatedUser.salespersonId,
        Client: updatedUser.Client,
        Salesperson: updatedUser.Salesperson,
      },
      SECRET
    );

    return {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        salespersonId: updatedUser.salespersonId,
        clientId: updatedUser.clientId,
        Client: updatedUser.Client,
        Salesperson: updatedUser.Salesperson,
      },
      token,
    };
  }
}
