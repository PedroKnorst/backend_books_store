import { AppError } from '#/http/middlewares/ErrorHandler';
import { IUsersRepository } from '#/modules/User/repository/types/IUsersRepository';
import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { ISalespersonRepository } from '../../repository/@types/ISalesperson';

export class CreateSalespersonUseCase {
  constructor(
    private salespersonRepository: ISalespersonRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateSalespersonDTO) {
    // validação zod

    const userAlreadyExists = await this.usersRepository.findById(data.userId);

    if (userAlreadyExists?.salespersonId) throw new AppError('Este usuário ja tem um perfil de vendedor');

    const salesperson = await this.salespersonRepository.create(data);

    return salesperson;
  }
}
