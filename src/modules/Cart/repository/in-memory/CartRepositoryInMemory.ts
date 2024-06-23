import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { Cart } from '../../entities/Cart';
import { ICartRepository } from '../@types/ICartRepository';

export class CartRepositoryInMemory implements ICartRepository {
  carts: Cart[] = [];

  constructor(seeds?: boolean) {
    if (seeds) {
      this.carts.push({
        id: 'cartId1',
        totalPrice: 40,
        clientId: 'clientId1',
        BooksCart: [
          {
            bookId: 'bookId5',
            cartId: 'cartId1',
            id: 'bookCartId5',
            quantity: 2,
            totalPrice: 40,
            Book: {
              id: 'bookId1',
              author: 'Stan Lee',
              category: 'ACTION',
              character: 'Homem de Ferro',
              description: 'Homem de Ferro descrição',
              price: 20,
              salespersonId: 'salespersonId1',
              storage: 5,
              title: 'Homem de Ferro 1',
              Salesperson: { balance: 0, id: 'salespersonId1', userId: 'userId4' },
            },
          },
        ],
      });
      this.carts.push({
        id: 'cartId5',
        totalPrice: 0,
        clientId: 'clientId5',
        BooksCart: [
          {
            bookId: 'bookId1',
            cartId: 'cartId5',
            id: 'bookCartId5',
            quantity: 2,
            totalPrice: 40,
            Book: {
              id: 'bookId1',
              author: 'Stan Lee',
              category: 'ACTION',
              character: 'Homem de Ferro',
              description: 'Homem de Ferro descrição',
              price: 20,
              salespersonId: 'salespersonId1',
              storage: 5,
              title: 'Homem de Ferro 1',
            },
          },
        ],
      });
    }
  }

  async addBookToCart(data: AddBookToCartDTO): Promise<Cart> {
    const { bookId, cartTotalPrice, quantity, totalPrice } = data;

    const cartIndex = this.carts.findIndex(currentCart => currentCart.id === data.id);

    let cart = this.carts[cartIndex];

    cart.BooksCart?.push({
      bookId,
      cartId: cart.id,
      quantity,
      totalPrice,
      id: 'bookCartId4',
    });

    cart.totalPrice = cartTotalPrice;

    const replaceCart = this.carts.filter(currentCart => currentCart.id !== cart.id);

    replaceCart.push(cart);

    this.carts = replaceCart;

    return cart;
  }

  async create(): Promise<Cart> {
    const cart: Cart = { id: 'cartId1', totalPrice: 0 };

    this.carts.push(cart);

    return cart;
  }

  async findCartByClient(clientId: string): Promise<Cart | null> {
    const cart = this.carts.find(currentCart => currentCart.clientId === clientId);

    return cart || null;
  }

  async removeBookOfCart(data: RemoveBookOfCartDTO): Promise<Cart> {
    const { cartTotalPrice, bookCartId } = data;

    const cartIndex = this.carts.findIndex(currentCart => currentCart.id === data.id);

    let cart = this.carts[cartIndex];

    const filteredBooksCart = cart.BooksCart?.filter(currentBookCart => currentBookCart.id !== bookCartId);

    cart.BooksCart = filteredBooksCart;

    cart.totalPrice = cartTotalPrice;

    const replaceCart = this.carts.filter(currentCart => currentCart.id !== cart.id);

    replaceCart.push(cart);

    this.carts = replaceCart;

    return cart;
  }

  async update(data: { clientId?: string | undefined; id: string; bookCartId?: string | undefined }): Promise<Cart> {
    const { id, bookCartId, clientId } = data;

    const cartIndex = this.carts.findIndex(currentCart => currentCart.id === id);

    let cart = this.carts[cartIndex];

    if (clientId) {
      cart.clientId = clientId;
    }

    if (bookCartId) {
      cart.BooksCart = cart.BooksCart?.filter(bookCart => bookCart.id !== bookCartId);
    }

    const replaceCart = this.carts.filter(currentCart => currentCart.id !== cart.id);

    replaceCart.push(cart);

    this.carts = replaceCart;

    return cart;
  }
}
