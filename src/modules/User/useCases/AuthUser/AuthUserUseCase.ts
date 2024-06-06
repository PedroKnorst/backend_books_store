import { compare } from 'bcrypt';
import { IAuthUser } from '../../dtos/AuthUserDTO';
import { IUsersRepository } from '../../repository/types/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv-safe';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { authUserSchema } from '../../validator/authUser';

config();

const SECRET = process.env.SECRET || '12345';

export class AuthUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthUser): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
    validateSchema({ email, password }, authUserSchema);

    const findUserByEmail = await this.usersRepository.findByEmail(email);
    if (!findUserByEmail) throw new AppError('Email e/ou senha incorreto(s)!');

    const matchPassword = await compare(password, findUserByEmail.password);

    if (!matchPassword) throw new AppError('Email e/ou senha incorreto(s)!');

    const token = sign({ id: findUserByEmail.id }, SECRET);

    return { user: findUserByEmail, token };
  }
}
