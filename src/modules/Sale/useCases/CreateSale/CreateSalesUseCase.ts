import { AppError } from '#/http/middlewares/ErrorHandler';
import { ICartRepository } from '#/modules/Cart/repository/@types/ICartRepository';
import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { ISalesRepository } from '../../repository/@types/ISalesRepository';

export class CreateSalesUseCase {
  constructor(
    private salesRepository: ISalesRepository,
    private cartsRepository: ICartRepository
  ) {}

  async execute(data: Omit<CreateSaleDTO, 'salespersonId' | 'cartId'>) {
    const cart = await this.cartsRepository.findCartByClient(data.clientId);

    if (!cart) throw new AppError('O carrinho não existe');

    let sales = [];

    for (let index = 0; index < cart.BooksCart.length; index++) {
      const salespersonId = cart.BooksCart[index].Book?.salespersonId;
      if (!salespersonId) throw new AppError('O vendedor não existe');
      const sale = await this.salesRepository.create({ ...data, salespersonId, cartId: cart.id });
      sales.push(sale);
    }

    return sales;
  }
}
