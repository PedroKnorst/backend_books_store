import { AppError } from '#/http/middlewares/ErrorHandler';
import { IBooksRepository } from '#/modules/Book/repository/@types/IBooksRepository';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { IBooksCartRepository } from '../../repository/@types/IBooksCartRepository';

export class UpdateBookCartUseCase {
  constructor(
    private booksCartRepository: IBooksCartRepository,
    private booksRepository: IBooksRepository
  ) {}

  async execute(data: Omit<UpdateBookCartDTO, 'totalPrice'>) {
    // adicionar validação zod

    const findBookCart = await this.booksCartRepository.findById(data.id);

    if (!findBookCart?.bookId) throw new AppError('Este livro não esta no carrinho');

    const book = await this.booksRepository.findByid(findBookCart?.bookId);

    if (!book) throw new AppError('Este livro não esta no carrinho');

    const totalPrice = book.price * data.quantity;

    const bookCart = await this.booksCartRepository.update({ ...data, totalPrice });

    return bookCart;
  }
}
