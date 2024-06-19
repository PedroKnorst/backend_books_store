import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { Cart } from '../../entities/Cart';

export interface ICartRepository {
  addBookToCart(data: AddBookToCartDTO): Promise<Cart>;
  removeBookOfCart(data: RemoveBookOfCartDTO): Promise<Cart>;
  findCartByClient(clientId: string): Promise<Cart | null>;
  create(): Promise<Cart>;
  update(data: { clientId?: string; id: string; bookCartId?: string }): Promise<Cart>;
}
