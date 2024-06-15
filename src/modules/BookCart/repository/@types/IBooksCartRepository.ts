import { BookCart } from '@prisma/client';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';

export interface IBooksCartRepository {
  update(data: UpdateBookCartDTO): Promise<BookCart>;
  findById(id: string): Promise<BookCart | null>;
}
