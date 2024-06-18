import { AppError } from '#/http/middlewares/ErrorHandler';
import { ISalespersonRepository } from '#/modules/Salesperson/repository/@types/ISalesperson';
import { validateSchema } from '#/utils/validateSchema';
import { Image } from '@prisma/client';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { IBooksRepository } from '../../repository/@types/IBooksRepository';
import { createBookSchema } from './CreateBookSchema';

export class CreateBookUseCase {
  constructor(
    private booksRepository: IBooksRepository,
    private salespersonRepository: ISalespersonRepository
  ) {}

  async execute(data: CreateBookDTO, image: Pick<Image, 'path'>) {
    validateSchema(data, createBookSchema);

    const salespersonExists = await this.salespersonRepository.findById(data.salespersonId);

    if (!salespersonExists) throw new AppError('Este vendedor não existe no sistema!');

    const book = await this.booksRepository.create(data, image);

    return book;
  }
}
