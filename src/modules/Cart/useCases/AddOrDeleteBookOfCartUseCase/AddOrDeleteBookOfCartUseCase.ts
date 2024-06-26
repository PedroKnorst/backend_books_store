import { AppError } from '#/http/middlewares/ErrorHandler';
import { IBooksRepository } from '#/modules/Book/repository/@types/IBooksRepository';
import { IBooksCartRepository } from '#/modules/BookCart/repository/@types/IBooksCartRepository';
import { validateSchema } from '#/utils/validateSchema';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { ICartRepository } from '../../repository/@types/ICartRepository';
import { AddOrDeleteBookOfCartSchema } from './AddOrDeleteBookOfCartSchema';

export class AddOrDeleteBookOfCartUseCase {
  constructor(
    private cartsRepository: ICartRepository,
    private booksRepository: IBooksRepository,
    private booksCartRepository: IBooksCartRepository
  ) {}

  async execute(data: Pick<AddBookToCartDTO, 'bookId' | 'clientId'>, deleteBook?: boolean) {
    validateSchema(data, AddOrDeleteBookOfCartSchema);

    const bookExists = await this.booksRepository.findByid(data.bookId);
    if (!bookExists) throw new AppError('O livro não existe ou foi deletado');

    const cartExists = await this.cartsRepository.findCartByClient(data.clientId);

    if (!cartExists) throw new AppError('Nenhum carrinho foi encontrado');

    if (deleteBook) {
      const bookExistsInCart = await this.booksCartRepository.findByBookAndCartId({
        bookId: bookExists.id,
        cartId: cartExists.id,
      });

      if (!bookExistsInCart) throw new AppError('O livro não existe neste carrinho');

      const cart = await this.cartsRepository.removeBookOfCart({
        ...data,
        id: cartExists.id,
        bookCartId: bookExistsInCart.id,
        cartTotalPrice: cartExists.totalPrice - bookExists.price * bookExistsInCart.quantity,
      });

      return cart;
    }

    const bookExistsInCart = await this.booksCartRepository.findByBookAndCartId({
      bookId: bookExists.id,
      cartId: cartExists.id,
    });

    if (bookExistsInCart) throw new AppError('Este livro ja foi adicionado ao carrinho');

    const cart = await this.cartsRepository.addBookToCart({
      ...data,
      quantity: 1,
      totalPrice: bookExists.price,
      id: cartExists.id,
      cartTotalPrice: cartExists.totalPrice + bookExists.price,
    });

    return cart;
  }
}
