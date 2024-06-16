import { PaymentType } from '@prisma/client';
import { IPaymentsRepository } from '../@types/IPaymentsRepository';
import prisma from '#/database/PrismaClient';

export class PaymentsRepository implements IPaymentsRepository {
  async getByClientId(clientId: string): Promise<{ id: string; type: PaymentType; clientId: string } | null> {
    const payment = await prisma.payment.findFirst({
      where: { clientId: clientId },
    });

    return payment;
  }
}
