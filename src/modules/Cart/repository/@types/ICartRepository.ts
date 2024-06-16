import { Cart } from '@prisma/client';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { ICart } from '../../entities/Cart';

export interface ICartRepository {
  addBookToCart(data: AddBookToCartDTO): Promise<Cart>;
  removeBookOfCart(data: RemoveBookOfCartDTO): Promise<void>;
  findCartByClient(clientId: string): Promise<ICart | null>;
  create(): Promise<Cart>;
  update(data: { clientId: string; id: string }): Promise<Cart>;
}
