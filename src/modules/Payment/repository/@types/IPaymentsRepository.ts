import { Payment } from '@prisma/client';
import { CreatePaymentDTO } from '../../dtos/CreatePayment';

export interface IPaymentsRepository {
  create(data: CreatePaymentDTO): Promise<Payment>;
}
