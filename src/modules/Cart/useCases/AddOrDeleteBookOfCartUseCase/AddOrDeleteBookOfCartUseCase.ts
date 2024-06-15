import { AppError } from '#/http/middlewares/ErrorHandler';
import { IBooksRepository } from '#/modules/Book/repository/@types/IBooksRepository';
import { validateSchema } from '#/utils/validateSchema';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { ICartRepository } from '../../repository/@types/ICartRepository';
import { AddOrDeleteBookOfCartSchema } from './AddOrDeleteBookOfCartSchema';

export class AddOrDeleteBookOfCartUseCase {
  constructor(
    private cartsRepository: ICartRepository,
    private booksRepository: IBooksRepository
  ) {}

  async execute(data: Pick<AddBookToCartDTO, 'bookId' | 'id'>, deleteBook?: boolean) {
    validateSchema(data, AddOrDeleteBookOfCartSchema);

    const bookExists = await this.booksRepository.findByid(data.bookId);
    if (!bookExists) throw new AppError('O livro não existe ou foi deletado!');

    if (deleteBook) {
      const cart = await this.cartsRepository.removeBookOfCart({ ...data });
      return cart;
    }

    const cart = await this.cartsRepository.addBookToCart({ ...data, quantity: 1, totalPrice: bookExists.price });

    return cart;
  }
}
