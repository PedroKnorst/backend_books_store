import { PaymentType } from '@prisma/client';
import { CreatePaymentDTO } from '../../dtos/CreatePayment';
import { IPaymentsRepository } from '../@types/IPaymentsRepository';
import prisma from '#/database/PrismaClient';

export class PaymentsRepository implements IPaymentsRepository {
  async create(data: CreatePaymentDTO): Promise<{ id: string; type: PaymentType; clientId: string }> {
    const payment = await prisma.payment.create({
      data: { Client: { connect: { id: data.clientId } } },
    });

    return payment;
  }
}
