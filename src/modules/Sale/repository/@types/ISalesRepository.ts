import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { Sale } from '../../entities/Sale';

export interface ISalesRepository {
  create(data: CreateSaleDTO): Promise<Sale>;
}
