import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { BookCart } from '../../entities/BookCart';

export interface IBooksCartRepository {
  update(data: UpdateBookCartDTO): Promise<BookCart>;
  findById(id: string): Promise<BookCart | null>;
  findByBookId(bookId: string): Promise<BookCart | null>;
}
