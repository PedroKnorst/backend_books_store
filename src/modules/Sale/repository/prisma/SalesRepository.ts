import prisma from '#/database/PrismaClient';
import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { Sale } from '../../entities/Sale';
import { ISalesRepository } from '../@types/ISalesRepository';

export class SalesRepository implements ISalesRepository {
  async create(data: CreateSaleDTO): Promise<Sale> {
    const sale = await prisma.sale.create({
      data: { cartId: data.cartId, paymentId: data.paymentId, salespersonId: data.salespersonId },
    });

    return sale;
  }
}
