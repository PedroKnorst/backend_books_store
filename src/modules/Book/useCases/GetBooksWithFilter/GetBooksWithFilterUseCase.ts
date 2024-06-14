import { validateSchema } from '#/utils/validateSchema';
import { IBooksRepository, IGetBooksFilters } from '../../repository/@types/IBooksRepository';
import { GetBooksWithFilterSchema } from './GetBooksWithFilterSchema';

export class GetBooksWithFilterUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(filters: IGetBooksFilters) {
    validateSchema(filters, GetBooksWithFilterSchema);

    const { books, total } = await this.booksRepository.getBooksWithFilter(filters);

    return { books, total };
  }
}
