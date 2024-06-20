import { IPaymentsRepository } from '../@types/IPaymentsRepository';
import { Payment } from '../../entities/Payment';

export class PaymentsRepositoryInMemory implements IPaymentsRepository {
  payments: Payment[] = [];

  constructor(seeds?: boolean) {
    if (seeds) {
      this.payments.push({
        id: 'paymentId1',
        clientId: 'clientId1',
        type: 'CREDITCARD',
      });
    }
  }

  async getByClientId(clientId: string): Promise<Payment | null> {
    const payment = this.payments.find(currentPayment => currentPayment.clientId === clientId);

    return payment || null;
  }
}
