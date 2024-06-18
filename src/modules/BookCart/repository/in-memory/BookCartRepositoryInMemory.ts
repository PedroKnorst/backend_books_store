import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { BookCart } from '../../entities/BookCart';
import { IBooksCartRepository } from '../@types/IBooksCartRepository';

export class BooksCartRepositoryInMemory implements IBooksCartRepository {
  async findByBookId(bookId: string): Promise<BookCart | null> {}
  async findById(id: string): Promise<BookCart | null> {}
  async update(data: UpdateBookCartDTO): Promise<BookCart> {}
}
