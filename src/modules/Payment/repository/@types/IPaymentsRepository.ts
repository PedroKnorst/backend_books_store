import { Payment } from '../../entities/Payment';

export interface IPaymentsRepository {
  getByClientId(clientId: string): Promise<Payment | null>;
}
