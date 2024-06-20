import { IPaymentsRepository } from '../@types/IPaymentsRepository';
import prisma from '#/database/PrismaClient';
import { Payment } from '../../entities/Payment';

export class PaymentsRepository implements IPaymentsRepository {
  async getByClientId(clientId: string): Promise<Payment | null> {
    const payment = await prisma.payment.findFirst({
      where: { clientId: clientId },
    });

    return payment;
  }
}
