import { Sale } from '@prisma/client';
import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';

export interface ISalesRepository {
  create(data: CreateSaleDTO): Promise<Sale>;
}
