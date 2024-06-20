import { CreateUserDTO } from '#modules/User/dtos/CreateUserDTO.js';
import { IUsersRepository } from '#modules/User/repository/types/IUsersRepository.js';
import { hash } from 'bcrypt';
import { IUser } from '../../entities/User';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { validateSchema } from '#/utils/validateSchema';
import { createUserSchema } from '../../validator/createUser';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv-safe';
import { ISalespersonRepository } from '#/modules/Salesperson/repository/@types/ISalesperson';
import { IClientsRepository } from '#/modules/Client/repository/@types';
import { ICartRepository } from '#/modules/Cart/repository/@types/ICartRepository';
import { IPaymentsRepository } from '#/modules/Payment/repository/@types/IPaymentsRepository';

config();

const SECRET = process.env.SECRET || '12345';

interface ICreateUserResponse {
  user: Omit<IUser, 'password' | 'id'>;
  token: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private salespersonRepository: ISalespersonRepository,
    private clientsRepository: IClientsRepository,
    private cartsRepository: ICartRepository,
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute(data: CreateUserDTO, clientId?: string, salespersonId?: string): Promise<ICreateUserResponse> {
    validateSchema(data, createUserSchema);

    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
    if (userAlreadyExists) throw new AppError('Ja existe um usuário com este email');

    const hashedPassword = await hash(data.password, 8);

    const updatedUserData = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(updatedUserData);

    if (data.profile === 'CLIENT') {
      const client = await this.createClient({ userId: user.id, id: clientId });

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

    const salesperson = await this.createSalesperson({ userId: user.id, id: salespersonId });

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

  async createClient({ userId, id }: { userId: string; id?: string }) {
    const cart = await this.cartsRepository.create();

    const client = await this.clientsRepository.create({ userId, cartId: cart.id }, id);

    await this.cartsRepository.update({ clientId: client.id, id: cart.id });

    const payment = await this.paymentsRepository.getByClientId(client.id);

    if (!payment) throw new AppError('Forma de pagamento não encontrada');

    const udpatedClient = await this.clientsRepository.updateClient({ id: client.id, paymentId: payment.id });

    return udpatedClient;
  }

  async createSalesperson({ userId, id }: { userId: string; id?: string }) {
    const salesperson = await this.salespersonRepository.create({ userId }, id);

    return salesperson;
  }
}
