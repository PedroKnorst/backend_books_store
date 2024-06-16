import { Payment } from '@prisma/client';

export interface IPaymentsRepository {
  getByClientId(clientId: string): Promise<Payment | null>;
}
