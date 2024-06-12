import { AppError } from '#/http/middlewares/ErrorHandler';
import { IBooksRepository, IGetComicBooksFilters } from '../../repository/@types/IBooksRepository';

export class GetComicBooksMarvelAPIUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(filters: IGetComicBooksFilters) {
    //adicionar validação zod

    if (filters.page < 0 || filters.size < 0) {
      throw new AppError('Insira uma paginação maior que 0');
    }

    const { books, total } = await this.booksRepository.getComicBooksFromAPI(filters);

    return { books, total };
  }
}
