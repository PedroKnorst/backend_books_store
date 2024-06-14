import { validateSchema } from '#/utils/validateSchema';
import { IBooksRepository, IGetComicBooksFilters } from '../../repository/@types/IBooksRepository';
import { GetComicBooksMarvelAPISchema } from './GetComicBooksMarvelAPISchema';

export class GetComicBooksMarvelAPIUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(filters: IGetComicBooksFilters) {
    validateSchema(filters, GetComicBooksMarvelAPISchema);

    const { books, total } = await this.booksRepository.getComicBooksFromAPI(filters);

    return { books, total };
  }
}
