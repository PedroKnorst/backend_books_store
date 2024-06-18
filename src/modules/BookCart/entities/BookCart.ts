import { IBook } from '#/modules/Book/entities/Book';
import { ICart } from '#/modules/Cart/entities/Cart';
import { v4 } from 'uuid';

export interface IBookCart {
  id: string;
  quantity: number;
  totalPrice: number;
  bookId: string;
  Book?: IBook;
  cartId: string;
  Cart?: ICart;
}

export class BookCart {
  id: string;
  quantity: number;
  totalPrice: number;
  bookId: string;
  Book?: IBook;
  cartId: string;
  Cart?: ICart;

  constructor(props: Omit<IBookCart, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }

    Object.assign(this, props);
  }
}
