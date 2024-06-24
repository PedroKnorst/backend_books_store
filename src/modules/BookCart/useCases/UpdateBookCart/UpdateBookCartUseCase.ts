import { AppError } from '#/http/middlewares/ErrorHandler';
import { IBooksRepository } from '#/modules/Book/repository/@types/IBooksRepository';
import { ICartRepository } from '#/modules/Cart/repository/@types/ICartRepository';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { IBooksCartRepository } from '../../repository/@types/IBooksCartRepository';

export class UpdateBookCartUseCase {
  constructor(
    private booksCartRepository: IBooksCartRepository,
    private booksRepository: IBooksRepository,
    private cartRepository: ICartRepository
  ) {}

  async execute(data: Omit<UpdateBookCartDTO, 'totalPrice' | 'cartTotalPrice'>) {
    const findBookCart = await this.booksCartRepository.findById(data.id);

    if (!findBookCart?.bookId) throw new AppError('Este livro não esta no carrinho');

    const book = await this.booksRepository.findByid(findBookCart?.bookId);

    if (!book) throw new AppError('Este livro não existe');

    const cart = await this.cartRepository.findCartByClient(data.clientId);

    if (!cart) throw new AppError('Erro ao encontrar carrinho do cliente');

    const bookPrice = book.price;
    let totalPrice = findBookCart.totalPrice;

    let cartTotalPrice = cart?.totalPrice;

    if (data.quantity < findBookCart.quantity) {
      cartTotalPrice = cart?.totalPrice - bookPrice;
      totalPrice -= bookPrice;
    } else if (data.quantity > findBookCart.quantity) {
      cartTotalPrice = cart?.totalPrice + bookPrice;
      totalPrice += bookPrice;
    }

    const bookCart = await this.booksCartRepository.update({ ...data, totalPrice, cartTotalPrice });

    return bookCart;
  }
}
