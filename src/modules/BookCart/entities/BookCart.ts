import { IBook } from '#/modules/Book/entities/Book';
import { ICart } from '#/modules/Cart/entities/Cart';

export interface IBookCart {
  id: string;
  quantity: string;
  totalPrice: number;
  bookId: string;
  Book: IBook;
  cartId: string;
  Cart: ICart;
}
