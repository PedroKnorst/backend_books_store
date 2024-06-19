import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { Sale } from '../../entities/Sale';
import { ISalesRepository } from '../@types/ISalesRepository';

export class SalesRepositoryInMemory implements ISalesRepository {
  sales: Sale[] = [];

  async create(data: CreateSaleDTO): Promise<Sale> {
    const sale = new Sale({
      ...data,
      Cart: { BooksCart: [], id: 'cartId1', totalPrice: 0 },
      Payment: { clientId: 'clientId1', id: 'paymentId1', type: 'CREDITCARD' },
      Salesperson: { balance: 0, id: 'salespersonId1', userId: 'userId1' },
    });

    this.sales.push(sale);

    return sale;
  }
}
