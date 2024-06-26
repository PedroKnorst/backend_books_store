import { ICart } from '#/modules/Cart/entities/Cart';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { BookCart } from '../../entities/BookCart';
import { IBooksCartRepository } from '../@types/IBooksCartRepository';

export class BooksCartRepositoryInMemory implements IBooksCartRepository {
  booksCart: BookCart[] = [];

  constructor(seeds?: boolean, addSeeds?: BookCart[]) {
    if (seeds) {
      this.booksCart.push({
        bookId: 'bookId1',
        cartId: 'cartId1',
        id: 'bookCartId1',
        quantity: 2,
        totalPrice: 40,
        Cart: { totalPrice: 40, BooksCart: [], id: 'cartId1' },
      });
      this.booksCart.push({
        bookId: 'bookId2',
        cartId: 'cartId1',
        id: 'bookCartId2',
        quantity: 2,
        totalPrice: 60,
        Cart: { totalPrice: 60, BooksCart: [], id: 'cartId1' },
      });
      this.booksCart.push({
        bookId: 'bookId5',
        cartId: 'cartId1',
        id: 'bookCartId2',
        quantity: 2,
        totalPrice: 60,
        Cart: { totalPrice: 60, BooksCart: [], id: 'cartId1' },
      });
    }

    if (addSeeds) {
      addSeeds.forEach(bookCart => {
        this.booksCart.push(bookCart);
      });
    }
  }

  async findByBookAndCartId(data: { bookId: string; cartId: string }): Promise<BookCart | null> {
    const bookCart = this.booksCart.find(
      currentBookCart => currentBookCart.bookId === data.bookId && currentBookCart.cartId === data.cartId
    );

    return bookCart || null;
  }

  async findById(id: string): Promise<BookCart | null> {
    const bookCart = this.booksCart.find(currentBookCart => currentBookCart.id === id);

    return bookCart || null;
  }

  async update(data: UpdateBookCartDTO): Promise<BookCart> {
    const { cartTotalPrice, id, quantity, totalPrice } = data;

    const bookCartIndex = this.booksCart.findIndex(currentBookCart => currentBookCart.id === id);

    let bookCart = this.booksCart[bookCartIndex];

    bookCart = {
      ...bookCart,
      quantity,
      totalPrice,
      Cart: { ...(bookCart.Cart as ICart), totalPrice: cartTotalPrice },
    };

    return bookCart;
  }
}
