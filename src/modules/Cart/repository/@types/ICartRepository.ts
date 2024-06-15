import { Cart } from '@prisma/client';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';

export interface ICartRepository {
  addBookToCart(data: AddBookToCartDTO): Promise<Cart>;
  removeBookOfCart(data: RemoveBookOfCartDTO): Promise<void>;
}
