import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { UpdateCartDTO } from '../../dtos/UpdateCartDTO';
import { Cart } from '../../entities/Cart';

export interface ICartRepository {
  addBookToCart(data: AddBookToCartDTO): Promise<Cart>;
  removeBookOfCart(data: RemoveBookOfCartDTO): Promise<Cart>;
  findCartByClient(clientId: string): Promise<Cart | null>;
  create(): Promise<Cart>;
  update(data: UpdateCartDTO): Promise<Cart>;
}
