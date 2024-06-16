import { AppError } from '#/http/middlewares/ErrorHandler';
import { ICartRepository } from '#/modules/Cart/repository/@types/ICartRepository';
import { ISalespersonRepository } from '#/modules/Salesperson/repository/@types/ISalesperson';
import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { ISalesRepository } from '../../repository/@types/ISalesRepository';

export class CreateSalesUseCase {
  constructor(
    private salesRepository: ISalesRepository,
    private cartsRepository: ICartRepository,
    private salespersonRepository: ISalespersonRepository
  ) {}

  async execute(data: Omit<CreateSaleDTO, 'salespersonId' | 'cartId'>) {
    const cart = await this.cartsRepository.findCartByClient(data.clientId);

    if (!cart) throw new AppError('O carrinho não existe');

    let sales = [];

    for (let index = 0; index < cart.BooksCart.length; index++) {
      const Salesperson = cart.BooksCart[index].Book?.Salesperson;
      if (!Salesperson) throw new AppError('O vendedor não existe');
      const sale = await this.salesRepository.create({ ...data, salespersonId: Salesperson.id, cartId: cart.id });

      const bookCart = cart.BooksCart[index];

      await this.salespersonRepository.update({
        id: Salesperson.id,
        balance: (Salesperson.balance || 0) + bookCart.totalPrice,
      });

      await this.cartsRepository.update({ id: cart.id, bookCartId: bookCart.id });

      sales.push(sale);
    }

    return sales;
  }
}
