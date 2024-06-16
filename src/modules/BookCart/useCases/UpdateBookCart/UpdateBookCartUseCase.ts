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
    // adicionar validação zod

    const findBookCart = await this.booksCartRepository.findById(data.id);

    if (!findBookCart?.bookId) throw new AppError('Este livro não esta no carrinho');

    const book = await this.booksRepository.findByid(findBookCart?.bookId);

    if (!book) throw new AppError('Este livro não esta no carrinho');

    const cart = await this.cartRepository.findCartByClient(data.clientId);

    if (!cart) throw new AppError('Erro ao encontrar carrinho do cliente');

    const totalPrice = book.price * data.quantity;

    const cartTotalPrice = cart?.totalPrice + totalPrice;

    const bookCart = await this.booksCartRepository.update({ ...data, totalPrice, cartTotalPrice });

    return bookCart;
  }
}
