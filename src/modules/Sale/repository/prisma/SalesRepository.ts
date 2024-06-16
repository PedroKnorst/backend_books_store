import prisma from '#/database/PrismaClient';
import { CreateSaleDTO } from '../../dtos/CreateSaleDTO';
import { ISalesRepository } from '../@types/ISalesRepository';

export class SalesRepository implements ISalesRepository {
  async create(data: CreateSaleDTO): Promise<{ id: string; cartId: string; paymentId: string; salespersonId: string }> {
    const sale = await prisma.sale.create({
      data: { cartId: data.cartId, paymentId: data.paymentId, salespersonId: data.salespersonId },
    });

    return sale;
  }
}
