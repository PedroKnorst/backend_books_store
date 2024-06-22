import { validateSchema } from '#/utils/validateSchema';
import { IBooksRepository, IGetComicBooksFilters } from '../../repository/@types/IBooksRepository';
import { GetComicBooksMarvelAPISchema } from './GetComicBooksMarvelAPISchema';

export class GetComicBooksMarvelAPIUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(filters: IGetComicBooksFilters) {
    validateSchema(filters, GetComicBooksMarvelAPISchema);

    if (filters.digitalId && this.booksRepository.findComicBookById) {
      const book = await this.booksRepository.findComicBookById(filters.digitalId);

      return { books: [book], total: 1 };
    }

    if (this.booksRepository.getComicBooksFromAPI) {
      const { books, total } = await this.booksRepository.getComicBooksFromAPI(filters);

      return { books, total };
    }

    return { books: [], total: 0 };
  }
}
