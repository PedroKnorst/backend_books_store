import { AppError } from '#/http/middlewares/ErrorHandler';
import { UpdateBookDTO } from '../../dtos/UpdateBookDTO';
import { IBooksRepository } from '../../repository/@types/IBooksRepository';

export class UpdateBookUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(data: UpdateBookDTO) {
    const bookExists = await this.booksRepository.findByid(data.id);

    if (!bookExists) throw new AppError('Este livro não existe');

    const updatedBook = await this.booksRepository.update(data);

    return updatedBook;
  }
}
