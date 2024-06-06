import { Payment } from '@prisma/client';
import { CreatePaymentDTO } from '../../dtos/CreatePayment';
import { IPaymentsRepository } from '../../repository/@types/IPaymentsRepository';

export class CreatePaymentUseCase {
  constructor(private paymentsRepository: IPaymentsRepository) {}

  async execute(data: CreatePaymentDTO): Promise<Payment> {
    //colocar validação zod

    //colocar validação se cliente existe

    const payment = await this.paymentsRepository.create(data);

    return payment;
  }
}
