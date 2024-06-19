import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { Cart } from '../../entities/Cart';
import { ICartRepository } from '../@types/ICartRepository';

export class CartRepositoryInMemory implements ICartRepository {
  carts: Cart[] = [];

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
