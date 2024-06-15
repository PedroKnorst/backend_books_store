import { compare } from 'bcrypt';
import { IAuthUser } from '../../dtos/AuthUserDTO';
import { IUsersRepository } from '../../repository/types/IUsersRepository';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv-safe';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { authUserSchema } from '../../validator/authUser';

config();

const SECRET = process.env.SECRET || '12345';

interface IAuthUserResponse {
  user: Omit<IUser, 'password' | 'id'>;
  token: string;
}

export class AuthUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthUser): Promise<IAuthUserResponse> {
    validateSchema({ email, password }, authUserSchema);

    const findUserByEmail = await this.usersRepository.findByEmail(email);
    if (!findUserByEmail) throw new AppError('Email e/ou senha incorreto(s)!');

    const matchPassword = await compare(password, findUserByEmail.password);

    if (!matchPassword) throw new AppError('Email e/ou senha incorreto(s)!');

    const token = jwt.sign(
      {
        id: findUserByEmail.id,
        clientId: findUserByEmail.clientId,
        salespersonId: findUserByEmail.salespersonId,
        Client: findUserByEmail.Client,
        Salesperson: findUserByEmail.Salesperson,
      },
      SECRET
    );

    return {
      user: {
        name: findUserByEmail.name,
        email: findUserByEmail.email,
        phone: findUserByEmail.phone,
        salespersonId: findUserByEmail.salespersonId,
        clientId: findUserByEmail.clientId,
        Client: findUserByEmail.Client,
        Salesperson: findUserByEmail.Salesperson,
      },
      token,
    };
  }
}
