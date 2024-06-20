import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { BookCart } from '../../entities/BookCart';

export interface IBooksCartRepository {
  update(data: UpdateBookCartDTO): Promise<BookCart>;
  findById(id: string): Promise<BookCart | null>;
  findByBookAndCartId(data: { bookId: string; cartId: string }): Promise<BookCart | null>;
}
